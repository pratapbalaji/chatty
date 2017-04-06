import React, {Component} from 'react';

class Message extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={this.props.message.cssClass}>
        <span className="message-username">{this.props.message.user}</span>
        <span className="message-content">{this.props.message.message}</span>
      </div>
    );
  }
}
export default Message;