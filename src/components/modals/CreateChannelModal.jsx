import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    changeModalState: state.changeModalState,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newChannel',
})
class CreateChannelModal extends React.Component {
  handleAddChannel = async (value) => {
    const { channelName } = value;
    const { createChannel, reset, showModal } = this.props;
    try {
      await createChannel(channelName);
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
    reset();
    showModal({ createChannel: false });
  };

  render() {
    const {
      showModal,
      changeModalState: { createChannel },
      submitting,
      error,
      pristine,
      handleSubmit,
    } = this.props;

    return (
      <Modal
        show={createChannel}
        onHide={() => !submitting && showModal({ createChannel: false })}
        keyboard={!submitting}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.handleAddChannel)}>
          <Modal.Body>
            <h5>Submit channel name</h5>
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
              value="Create channel"
              className="btn btn-primary"
            />
            <Button
              variant="secondary"
              disabled={submitting}
              onClick={() => showModal({ createChannel: false })}
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

export default CreateChannelModal;
