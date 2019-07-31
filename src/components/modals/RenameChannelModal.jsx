import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    modals: state.modals,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'renameChannel',
})
class RenameChannelModal extends React.Component {
  handleRenameChannel = async (value) => {
    const { channelName } = value;
    const {
      renameChannel,
      reset,
      showModal,
      currentChannelId,
    } = this.props;

    try {
      await renameChannel(currentChannelId, channelName);
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
    reset();
    showModal({ renameChannelModal: false });
  };

  render() {
    const {
      error,
      pristine,
      showModal,
      submitting,
      handleSubmit,
      modals: { renameChannelModal },
    } = this.props;

    return (
      <Modal
        show={renameChannelModal}
        onHide={() => !submitting && showModal({ renameChannelModal: false })}
        keyboard={!submitting}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.handleRenameChannel)}>
          <Modal.Body>
            <h5>Submit new name for the channel</h5>
            <Field
              required
              component="input"
              disabled={submitting}
              type="text"
              name="channelName"
              className="form-control mr-sm-2 col"
              autoFocus
            />
          </Modal.Body>
          <Modal.Footer>
            <input
              type="submit"
              disabled={pristine || submitting}
              value="Rename channel"
              className="btn btn-primary"
            />
            <Button
              variant="secondary"
              disabled={submitting}
              onClick={() => showModal({ renameChannelModal: false })}
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

export default RenameChannelModal;
