const host = 'api/v1';

export default {
  channelsUrl: () => [host, 'channels'].join('/'),
  channelUrl: channelId => [host, 'channels', channelId].join('/'),
  messagesUrl: channelId => [host, 'channels', channelId, 'messages'].join('/'),
};