import React from 'react';
import connect from '../connect';
import { messagesSelector } from '../selectors';

const mapStateToProps = state => {
  const props = {
    messages: messagesSelector(state),
    // user: state.user,
  };
  return props;
}

@connect(mapStateToProps)
export default class MessagesList extends React.Component {


  render() {
    // console.log(this.props.user);
    const { messages } = this.props;
    const list = messages.map(({ author, message, id }) => <li key={id}>{author}: {message}</li>);
    return (
      <ul>
        {list}
      </ul>
    );
  }

};