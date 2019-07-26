import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import connect from '../../connect';

const mapStateToProps = state => {
  const props = {
    сhannelModal: state.сhannelModal,
    currentChannelId: state.currentChannelId,
  };
  return props;

  // тут есть проблема как и когда менять currentChannelId
  // он должен меняться когда удаляешь канал например
  // и currentChannelId сдвигается на другой 
  // связано с рендерингом каналов и выделенным пунктом active
};

@connect(mapStateToProps)
export default class DeleteChannelModal extends React.Component {

  handleDeleteChannel = () => {
    const { currentChannelId, deleteChannel, hideModal, changeCurrentChannel } = this.props;
    deleteChannel(currentChannelId);
    changeCurrentChannel(1); // делаем текущим главный канал
    hideModal({ deleteChannel: false, info: true });
 };

  onCancelDelete = () => {
    const { hideModal } = this.props;
    hideModal({ deleteChannel: false, cancel: true });
  }


  render() {
    // console.log(this.props);
    const { сhannelModal: { deleteChannel } } = this.props;

    return (
      <SweetAlert
        show={deleteChannel}
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={this.handleDeleteChannel}
        onCancel={this.onCancelDelete}
        >
        <p>You will not be able to recover this channel!</p>
      </SweetAlert>
    );
  }

};