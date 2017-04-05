import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main className="messages">
        {this.props.messages.map((message, index) => <Message key={index} message={message} />)}
      </main>
    );
  }
}

export default MessageList;