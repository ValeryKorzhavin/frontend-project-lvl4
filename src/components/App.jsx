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
  };
  return props;
};

@connect(mapStateToProps)
class App extends React.Component {
  handleAddChannel = () => {
    const { showModal } = this.props;
    showModal({ createChannel: true });
  };

  render() {
    return (
      <div className="container" style={{ height: '90vh' }}>
        <div className="row h-100">
          <div className="col-md-4 h-100">
            <Alert variant="secondary">Channels: </Alert>
            <ScrollBars className="mb-4" style={{ height: '70vh' }}>
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
            <ScrollBars className="mb-4" style={{ height: '70vh' }}>
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
