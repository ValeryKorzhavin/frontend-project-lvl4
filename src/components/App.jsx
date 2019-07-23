import React from 'react';
import connect from '../connect';
import NewMessageForm from './NewMessageForm';
import MessagesList from './MessagesList';
import { Field, reduxForm } from 'redux-form';


const mapStateToProps = (state) => {
	const props = {
    channels: state.channels,
    messages: state.messages,
    currentChannelId: state.currentChannelId,
	};
	return props;
};

@connect(mapStateToProps)
export default class App extends React.Component {


  render() {
    const { channels } = this.props;
    // console.log(channels); 
    // const channels = this.props.channels.map(({ id, name }) => <li key={id}>{name}</li>);
    // console.log(this.props.channels);
    // console.log(this.props.messages);
    // console.log(this.props.currentChannelId);
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <ul>
            </ul>
          </div>
          <div className="col-md-8">
            <MessagesList />
            <NewMessageForm />
          </div>
        </div>
      </div>      
    );
  }

};
