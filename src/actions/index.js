import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addChannel = createAction('CHANNEL_ADD');
export const addMessage = createAction('MESSAGE_ADD');
export const createUser = createAction('USER_CREATE');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const updateChannel = createAction('CHANNEL_UPDATE');
export const changeCurrentChannel = createAction('CURRENT_CHANNEL_CHANGE');

export const sendMessage = ({ author, message, time }, channelId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: { author, message, time } } });
  } catch (e) {
    throw e;
  }
};

export const createChannel = name => async (dispatch) => {
  try {
    const url = routes.channelsUrl(); 
    return await axios.post(url, { data: { attributes: { name } } });
  } catch (e) {
    throw e;
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  try {
    const url = routes.channelUrl(id); 
    return await axios.patch(url, { data: { attributes: { name } } });
  } catch (e) {
    throw e;
  }
};

export const deleteChannel = id => async (dispatch) => {
  try {
    const url = routes.channelUrl(id); 
    return await axios.delete(url);
  } catch (e) {
    throw e;
  }
};
