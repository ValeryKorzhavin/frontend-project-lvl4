import React from 'react';
import connect from '../connect';
import NewMessageForm from './NewMessageForm';
import Messages from './Messages';
import { Field, reduxForm } from 'redux-form';
import Channels from './Channels';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as actions from '../actions';
import { channelsSelector, messagesSelector } from '../selectors';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mapStateToProps = (state) => {
	const props = {
    channels: channelsSelector(state),
    messages: messagesSelector(state),
    currentChannelId: state.currentChannelId,
	};
	return props;
};

@connect(mapStateToProps)
export default class App extends React.Component {

  handleAddChannel = () => {   
    const { createChannel } = this.props;
    // const MySwal = withReactContent(Swal);
    

    Swal.fire({
      title: 'Create new channel',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      },
      inputPlaceholder: 'Enter channel name',
      showCancelButton: true,
      confirmButtonText: 'OK',
      showLoaderOnConfirm: true,
      preConfirm: (channel) => {
        return createChannel(channel)
          .then(response => {
            if (!response.data) {
              throw new Error(response.statusText);
            }
            return response.data;
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(({ value: { data: { attributes: { name } = 0 } = 0 } = 0 }) => {
      if (name) {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: `Channel "${name}" has been created`,
          showConfirmButton: false,
          timer: 1000
        });
      }
    });


  };


  render() {
    return (
      <div className="container" style={{ height: "90vh" }}>
        <div className="row h-100">
          <div className="col-md-4 h-100">
            <div className="card mb-2" style={{ height: "80vh" }}>
              <Channels />
            </div>
            <button className="btn btn-outline-primary w-100" onClick={this.handleAddChannel}>add channel</button>
          </div>
          <div className="col-md-8">
            <div className="card mb-2" style={{ height: "80vh" }}>
              <Messages />
            </div>
            <NewMessageForm />
          </div>
        </div>
      </div>      
    );
  }

};
