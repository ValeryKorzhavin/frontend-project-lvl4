import React from 'react';
import connect from '../connect';
import { channelsSelector } from '../selectors';
import { Nav } from 'react-bootstrap';
import Channel from './Channel';

const mapStateToProps = state => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
export default class Channels extends React.Component {

  handleChannelClick = channelId => {
    const { changeCurrentChannel, currentChannelId } = this.props;
    changeCurrentChannel(Number(channelId));
  };

  render() {
    const { channels, currentChannelId } = this.props;

    const channelsList = channels.map(channel => {
      return <Channel key={channel.id} channel={channel} />;
    });

    return (
       <Nav variant="pills" className="flex-column" activeKey={currentChannelId} onSelect={this.handleChannelClick}>
         {channelsList}
       </Nav>
    );
  }

};