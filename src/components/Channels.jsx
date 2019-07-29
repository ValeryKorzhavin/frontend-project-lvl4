import React from 'react';
import { Nav } from 'react-bootstrap';
import { channelsSelector, getCurrentChannelId } from '../selectors';
import Channel from './Channel';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: getCurrentChannelId(state),
  };
  return props;
};

@connect(mapStateToProps)
class Channels extends React.Component {
  handleChannelClick = (channelId) => {
    const { changeCurrentChannel } = this.props;
    changeCurrentChannel(Number(channelId));
  };

  render() {
    const { channels, currentChannelId } = this.props;

    const channelsList = channels.map(channel => <Channel key={channel.id} channel={channel} />);

    return (
      <Nav
        variant="pills"
        className="flex-column"
        activeKey={currentChannelId}
        onSelect={this.handleChannelClick}
      >
        {channelsList}
      </Nav>
    );
  }
}

export default Channels;
