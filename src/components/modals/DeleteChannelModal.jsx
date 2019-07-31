import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';
import { generalChannelSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const props = {
    changeModalState: state.changeModalState,
    generalChannel: generalChannelSelector(state),
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'removeChannel',
})
class DeleteChannelModal extends React.Component {
  handleDeleteChannel = async () => {
    const {
      deleteChannel,
      generalChannel,
      changeCurrentChannel,
      currentChannelId,
      showModal,
    } = this.props;

    try {
      await deleteChannel(currentChannelId);
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
    changeCurrentChannel(generalChannel.id);
    showModal({ removeChannel: false });
  };

  render() {
    const {
      showModal,
      changeModalState: { removeChannel },
      handleSubmit,
      submitting,
      error,
    } = this.props;

    return (
      <Modal
        show={removeChannel}
        onHide={() => !submitting && showModal({ removeChannel: false })}
        keyboard={!submitting}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure?</h5>
          <p>You will not be able to recover this channel!</p>
        </Modal.Body>
        <Form onSubmit={handleSubmit(this.handleDeleteChannel)}>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={submitting}>
              Delete
            </Button>
            <Button
              variant="secondary"
              disabled={submitting}
              onClick={() => showModal({ removeChannel: false })}
            >
              Cancel
            </Button>
            {error && <div className="ml-2">{error}</div>}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default DeleteChannelModal;
