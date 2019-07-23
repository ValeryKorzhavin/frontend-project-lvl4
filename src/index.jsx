import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { keyBy } from 'lodash';
import UserContext from './context';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
// const devtoolMiddleware = ext === undefined ? state => state : ext();

const store = createStore(
  reducers,
  {
    channels: gon.channels,
    messages: gon.messages,
    currentChannelId: gon.currentChannelId,
    // channels: keyBy(gon.channels, channel => channel.id),
    // messages: keyBy(gon.messages, message => message.id),
  },
  typeof devtoolMiddleware === 'undefined'
  ? compose(applyMiddleware(thunk))
  : compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

if (!cookies.get('user_name')) {
  cookies.set('user_name', faker.name.findName());
}

// const UserContext = React.createContext(cookies.get('user_name'));

// store.dispatch(actions.createUser(cookies.get('user_name')));

const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(actions.addMessage(attributes));
});

render(
  <Provider store={store}>
    <UserContext.Provider value={cookies.get('user_name')}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat')
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
