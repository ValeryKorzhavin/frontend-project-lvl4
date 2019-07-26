import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';
import { omit } from 'lodash';

const channels = handleActions({
  [actions.addChannel](state, { payload: channel }) {
    return { ...state, [channel.id]: channel };
  },
  [actions.removeChannel](state, { payload: channel }) {
    return omit(state, channel);
  },
  [actions.updateChannel](state, { payload: channel }) {
    return { ...state, [channel.id]: channel };
  },
}, {});

const messages = handleActions({
  [actions.addMessage](state, { payload: message }) {
    return { ...state, [message.id]: message };
  },
}, {});

const currentChannelId = handleActions({
  [actions.changeCurrentChannel](state, { payload: currentChannelId }) {
    return currentChannelId;
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});