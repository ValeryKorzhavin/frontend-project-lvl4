import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { omit, without } from 'lodash';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: channel }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
  [actions.removeChannel](state, { payload: channel }) {
    const { byId, allIds } = state;
    return {
      byId: omit(byId, channel),
      allIds: without(allIds, channel.id),
    };
  },
  [actions.updateChannel](state, { payload: channel }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds,
    };
  },
}, {});

const messages = handleActions({
  [actions.addMessage](state, { payload: message }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
}, {});

const currentChannelId = handleActions({
  [actions.changeCurrentChannel](state, { payload: channelId }) {
    return channelId;
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
