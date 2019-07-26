import React from 'react';
import connect from '../connect';
import NewMessageForm from './NewMessageForm';
import NewChannelForm from './NewChannelForm';
import Messages from './Messages';
import { Field, reduxForm } from 'redux-form';
import Channels from './Channels';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as actions from '../actions';
import NewChannelModal from './modals/NewChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';
import RenameChannelModal from './modals/RenameChannelModal';
import InfoModal from './modals/InfoModal';
import CancelModal from './modals/CancelModal';
import { channelsSelector, messagesSelector } from '../selectors';

const mapStateToProps = (state) => {
	const props = {
    channels: channelsSelector(state),
    messages: messagesSelector(state),
    currentChannelId: state.currentChannelId,
    сhannelModal: state.сhannelModal,
	};
	return props;
};

@connect(mapStateToProps)
export default class App extends React.Component {

  handleAddChannel = () => {
    const { showModal, createChannel } = this.props;
    showModal({ addChannel: true });
  };


  render() {
    const { сhannelModal: { addChannel, deleteChannel, renameChannel } } = this.props;

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

        <NewChannelModal />
        <DeleteChannelModal />
        <RenameChannelModal />
        <InfoModal />
        <CancelModal />
      </div>      
    );
  }

};
