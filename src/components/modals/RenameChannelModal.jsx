import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import connect from '../../connect';

const mapStateToProps = state => {
  const props = {
    сhannelModal: state.сhannelModal,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
export default class RenameChannelModal extends React.Component {

  handleCancel = () => {
    const { hideModal } = this.props;
    hideModal({ renameChannel: false });
  };

  handleConfirm = name => {
    const { currentChannelId, renameChannel, hideModal } = this.props;
    // console.log(name);
    // console.log(currentChannelId);
    renameChannel(currentChannelId, name);
    hideModal({ renameChannel: false });
  };

  render() {
    // console.log(this.props.сhannelModal.addChannel);
    const { сhannelModal: { addChannel, deleteChannel, renameChannel } } = this.props;
    // console.log(channelModal);
    // console.log(this.props);

    return (
      <SweetAlert
        input 
        showCancel
        btnSize="xs"
        defaultValue=""
        cancelBtnBsStyle="default" 
        show={renameChannel} 
        title="Rename channel" 
        onCancel={this.handleCancel} 
        onConfirm={this.handleConfirm}
      >
        <p>Enter new name for the channel!</p>
      </SweetAlert>
    );
  }

};