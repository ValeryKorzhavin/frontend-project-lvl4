const host = 'api/v1';

export default {
  channelsUrl: channelId => [host, ''].join('/'),
  messagesUrl: channelId => [host, 'channels', channelId, 'messages'].join('/'),
};