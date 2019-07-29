import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import ScrollBars from 'react-custom-scrollbars';
import sweetAlert from 'sweetalert2';
import NewMessageForm from './NewMessageForm';
import Messages from './Messages';
import Channels from './Channels';
import connect from '../connect';
import { messagesSelector, channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    messages: messagesSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class App extends React.Component {
  handleAddChannel = async () => {
    const { createChannel } = this.props;

    const { value } = await sweetAlert.fire({
      title: 'Create new channel',
      input: 'text',
      inputValidator: (inputValue) => {
        if (!inputValue) {
          return 'You need to write something!';
        }
        return '';
      },
      inputPlaceholder: 'Enter channel name',
      showCancelButton: true,
      confirmButtonText: 'OK',
      showLoaderOnConfirm: true,
      preConfirm: channel => createChannel(channel)
        .then((response) => {
          if (!response.data) {
            throw new Error(response.statusText);
          }
          return response.data;
        })
        .catch((error) => {
          sweetAlert.showValidationMessage(
            `Request failed: ${error}`,
          );
        }),
      allowOutsideClick: () => !sweetAlert.isLoading(),
    });

    if (value) {
      const { data: { attributes: { name } } } = value;
      sweetAlert.fire({
        position: 'center',
        type: 'success',
        title: `Channel "${name}" has been created`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
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
        </div>
      </div>
    );
  }
}

export default App;
