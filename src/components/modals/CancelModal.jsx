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
export default class CancelModal extends React.Component {

  handleCancel = () => {
    const { hideModal } = this.props;
    hideModal({ cancel: false });
  };

  handleConfirm = name => {
    const { showModal } = this.props;
    showModal({ cancel: false });
  };

  render() {
    const { сhannelModal: { cancel } } = this.props;

    return (
      <SweetAlert 
        danger 
        title="Cancelled!" 
        onConfirm={this.handleConfirm}
        show={cancel}
        btnSize="xs"
      >
        Channel is safe!
      </SweetAlert>
    );
  }

};