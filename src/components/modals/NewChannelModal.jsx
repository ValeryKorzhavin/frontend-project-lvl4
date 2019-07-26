import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import connect from '../../connect';

const mapStateToProps = state => {
  const props = {
    сhannelModal: state.сhannelModal,
  };
  return props;
};

@connect(mapStateToProps)
export default class NewChannelModal extends React.Component {

  handleCancel = () => {
    const { hideModal } = this.props;
    hideModal({ addChannel: false, cancel: true });
  };

  handleConfirm = name => {
    const { showModal, createChannel } = this.props;
    createChannel(name);
    showModal({ addChannel: false, info: true });
  };

  render() {
    const { сhannelModal: { addChannel, deleteChannel, renameChannel } } = this.props;

    return (
      <SweetAlert
        input 
        showCancel
        btnSize="xs"
        defaultValue=""
        cancelBtnBsStyle="default" 
        show={addChannel} 
        title="Create channel" 
        onCancel={this.handleCancel} 
        onConfirm={this.handleConfirm}
      >
        <p>Enter new channel name!</p>
      </SweetAlert>
    );
  }

};