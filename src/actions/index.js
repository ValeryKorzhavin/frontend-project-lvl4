import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const addChannel = createAction('CHANNEL_ADD');
export const addMessage = createAction('MESSAGE_ADD');
export const createUser = createAction('USER_CREATE');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const updateChannel = createAction('CHANNEL_UPDATE');
export const changeCurrentChannel = createAction('CURRENT_CHANNEL_CHANGE');

export const showModal = createAction('MODAL_SHOW');

export const sendMessage = ({ author, message, time }, channelId) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = routes.messagesUrl(channelId);
    await axios.post(url, { data: { attributes: { author, message, time } } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
  }
};

export const createChannel = name => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    const url = routes.channelsUrl();
    await axios.post(url, { data: { attributes: { name } } });
    dispatch(createChannelSuccess());
  } catch (e) {
    dispatch(createChannelFailure());
    throw e;
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.channelUrl(id);
    await axios.patch(url, { data: { attributes: { name } } });
    dispatch(renameChannelSuccess());
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};

export const deleteChannel = id => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const url = routes.channelUrl(id);
    await axios.delete(url);
    dispatch(deleteChannelSuccess());
  } catch (e) {
    dispatch(deleteChannelFailure());
    throw e;
  }
};
