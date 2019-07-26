import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    // author: state.user,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newChannel',
})
export default class NewChannelForm extends React.Component {

  handleCreateChannel = (values) => {
    const { channel } =  values;
    const { createChannel, currentChannelId, reset } = this.props;
    createChannel(channel);
    
    reset();
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className="form-inline mt-2" onSubmit={handleSubmit(this.handleCreateChannel)}>
        <Field required component="input" type="text" name="channel" className="form-control w-100" />
        <input type="submit" value="create channel" className="btn btn-primary mt-2 w-100" />
      </form>
    );
  }

};

