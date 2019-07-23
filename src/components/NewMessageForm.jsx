import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import * as actions from '../actions';
import UserContext from '../context';

const mapStateToProps = (state) => {
  const props = {
    // author: state.user,
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

  handleAddMessage = (values) => {
    const { message } =  values;
    const { sendMessage, currentChannelId, reset } = this.props;
    const author = this.context; 
    sendMessage({ author, message }, currentChannelId);
    reset();
  };



  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleAddMessage)}>
        <Field required component="input" type="text" name="message" className="" />
        <input type="submit" value="send message" className="btn btn-primary ml-3" />
      </form>
    );
  }

};

