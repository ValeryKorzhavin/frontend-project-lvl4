import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';


export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');
export const addMessage = createAction('MESSAGE_ADD');


export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');

export const addChannel = createAction('CHANNEL_ADD');
export const updateChannel = createAction('CHANNEL_UPDATE');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const changeCurrentChannel = createAction('CURRENT_CHANNEL_CHANGE');

export const showModal = createAction("MODAL_SHOW");
export const hideModal = createAction("MODAL_HIDE");

export const createUser = createAction('USER_CREATE');

export const sendMessage = ({ author, message, time }, channelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: { author, message, time } } });
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export const createChannel = name => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    const url = routes.channelsUrl(); 
    console.log(url);
    const response = await axios.post(url, { data: { attributes: { name } } });
    dispatch(createChannelSuccess());
  } catch (e) {
    dispatch(createChannelFailure());
    throw e;
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  // dispatch(createChannelRequest());
  try {
    const url = routes.channelUrl(id); 
    // console.log(url);
    const response = await axios.patch(url, { data: { attributes: { name } } });
    // dispatch(createChannelSuccess());
  } catch (e) {
    // dispatch(createChannelFailure());
    throw e;
  }
};

export const deleteChannel = id => async (dispatch) => {
  // dispatch(createChannelRequest());
  try {
    const url = routes.channelUrl(id); 
    // console.log(url);
    await axios.delete(url);
    // dispatch(createChannelSuccess());
  } catch (e) {
    // dispatch(createChannelFailure());
    throw e;
  }
};