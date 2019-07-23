import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

export const getMessages = state => pickBy(state.messages, message => (
  message.channelId === state.currentChannelId
));

export const messagesSelector = createSelector(
  getMessages,
  messages => Object.values(messages)
);
