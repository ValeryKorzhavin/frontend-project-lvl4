import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';
import * as actions from '../actions';
import UserContext from '../context';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})
export default class NewMessageForm extends React.Component {
  static contextType = UserContext;

  handleAddMessage = async (values) => {
    const { message } =  values;
    const { sendMessage, currentChannelId, reset } = this.props;
    const author = this.context; 
    const date = new Date();
    const time = date.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true });
    try {
      await sendMessage({ author, message, time }, currentChannelId);
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
    reset();
  };

  render() {
    const { 
      handleSubmit, submitting, pristine, error, 
    } = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleAddMessage)}>
        <Field 
          required 
          component="input" 
          disabled={submitting}
          type="text" 
          name="message" 
          className="form-control mr-sm-2 col" 
          autoFocus
        />
        <input 
          type="submit" 
          disabled={pristine || submitting} 
          value="send message" 
          className="btn btn-primary" 
        />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }

};

