import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import ScrollBars from 'react-custom-scrollbars';
import NewMessageForm from './NewMessageForm';
import Messages from './Messages';
import Channels from './Channels';
import connect from '../connect';
import { messagesSelector, channelsSelector } from '../selectors';
import CreateChannelModal from './modals/CreateChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';
import RenameChannelModal from './modals/RenameChannelModal';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    messages: messagesSelector(state),
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class App extends React.Component {
  handleAddChannel = () => {
    const { showModal } = this.props;
    showModal({ createChannelModal: true });
  };

  render() {
    const { currentChannelId, channels } = this.props;
    const { name } = channels.find(channel => channel.id === currentChannelId);

    return (
      <div className="container vh-90">
        <div className="row h-100">
          <div className="col-md-4">
            <Alert variant="secondary">
              <span className="mr-2">Channels:</span>
              {name}
            </Alert>
            <ScrollBars
              className="mb-4"
              autoHeight
              autoHeightMin="75vh"
            >
              <Channels />
            </ScrollBars>
            <Button
              className="btn btn-outline-primary w-100"
              onClick={this.handleAddChannel}
            >
              add channel
            </Button>
          </div>
          <div className="col-md-8">
            <Alert variant="secondary">Messages: </Alert>
            <ScrollBars
              className="mb-4"
              autoHeight
              autoHeightMin="75vh"
            >
              <Messages />
            </ScrollBars>
            <NewMessageForm />
          </div>
          <CreateChannelModal />
          <RenameChannelModal />
          <DeleteChannelModal />
        </div>
      </div>
    );
  }
}

export default App;
