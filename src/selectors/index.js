import { createSelector } from 'reselect';
import { pickBy, find } from 'lodash';

export const getCurrentChannelId = state => state.currentChannelId;
export const getMessages = state => state.messages.byId;

export const messagesSelector = createSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => Object.values(pickBy(messages, message => (
    message.channelId === currentChannelId
  ))),
);

export const getChannels = state => state.channels.byId;
export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);

export const generalChannelSelector = createSelector(
  channelsSelector,
  channels => find(channels, channel => (channel.id === 1)),
);
