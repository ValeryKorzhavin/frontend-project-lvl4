import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: channel }) {
    return { ...state, [channel.id]: channel };
  },
}, {});

// const user = handleActions({
//   [actions.createUser](state, { payload: user }) {
//     console.log(state);
//     return user;
//   }
// }, {});

const messages = handleActions({
  [actions.addMessage](state, { payload: message }) {
    return { ...state, [message.id]: message };
  },
}, {});

const currentChannelId = handleActions({
  [actions.changeChannelId](state, { payload: message }) {
    return { ...state, [message.id]: message };
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});