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
export default class InfoModal extends React.Component {

  handleCancel = () => {
    const { hideModal } = this.props;
    hideModal({ info: false });
  };

  handleConfirm = name => {
    const { showModal } = this.props;
    showModal({ info: false });
  };

  render() {
    const { сhannelModal: { info } } = this.props;

    return (
      <SweetAlert 
        success 
        title="Done!" 
        onConfirm={this.handleConfirm}
        show={info}
        btnSize="xs"
      >
        Channel removed!
      </SweetAlert>
    );
  }

};