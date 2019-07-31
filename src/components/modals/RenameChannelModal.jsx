import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    changeModalState: state.changeModalState,
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
    showModal({ renameChannel: false });
  };

  render() {
    const {
      error,
      pristine,
      showModal,
      submitting,
      handleSubmit,
      changeModalState: { renameChannel },
    } = this.props;

    return (
      <Modal
        show={renameChannel}
        onHide={() => !submitting && showModal({ renameChannel: false })}
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
              onClick={() => showModal({ renameChannel: false })}
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
