import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { keyBy, map } from 'lodash';
import * as actions from './actions';
import UserContext from './context';
import reducers from './reducers';
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  {
    currentChannelId: gon.currentChannelId,
    channels: {
      byId: keyBy(gon.channels, 'id'),
      allIds: map(gon.channels, 'id'),
    },
    messages: {
      byId: keyBy(gon.messages, 'id'),
      allIds: map(gon.messages, 'id'),
    },
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

const socket = io();
socket
  .on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessage(attributes));
  })
  .on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.addChannel(attributes));
  })
  .on('removeChannel', ({ data: { id } }) => {
    store.dispatch(actions.removeChannel(id));
  })
  .on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.updateChannel(attributes));
  });

render(
  <Provider store={store}>
    <UserContext.Provider value={cookies.get('user_name')}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
