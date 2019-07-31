import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import {
  omit,
  without,
  omitBy,
  map,
} from 'lodash';
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
  [actions.removeChannel](state, { payload: id }) {
    const { byId } = state;
    const restMessages = omitBy(byId, ({ channelId }) => channelId === id);
    return {
      byId: restMessages,
      allIds: map(restMessages, 'id'),
    };
  },
}, {});

const currentChannelId = handleActions({
  [actions.changeCurrentChannel](state, { payload: channelId }) {
    return channelId;
  },
}, {});

const changeModalState = handleActions({
  [actions.showModal](state, { payload: modals }) {
    return { ...state, ...modals };
  },
}, { createChannel: false, renameChannel: false, removeChannel: false });

export default combineReducers({
  channels,
  messages,
  changeModalState,
  currentChannelId,
  form: formReducer,
});
