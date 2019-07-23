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

export const changeChannelId = () => {

};

export const createUser = createAction('USER_CREATE');

export const sendMessage = ({ author, message }, channelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.messagesUrl(channelId);
    // console.log(message);
    // console.log(channelId);

    const response = await axios.post(url, { data: { attributes: { author, message } } });
    console.log(response.data.data);
    // dispatch(addMessageSuccess({ message: { response.data } }));
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};