import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

export const getMessages = state => pickBy(state.messages, message => (
  message.channelId === state.currentChannelId
));

export const messagesSelector = createSelector(
  getMessages,
  messages => Object.values(messages)
);

export const getChannels = state => state.channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels)
);