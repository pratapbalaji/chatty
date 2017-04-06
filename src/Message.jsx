import React, {Component} from 'react';

class Message extends Component {
  constructor() {
    super();
    this.messageContainsImage = this.messageContainsImage.bind(this);
  }

  messageContainsImage(message) {
    if (message.includes(".jpg", ".jpeg", ".png")) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if(this.messageContainsImage(this.props.message.message) === true)
    {
      return (
      <div className={this.props.message.cssClass}>
        <span className="message-username" style={{color: this.props.message.usercolor}}>{this.props.message.user}
        <img className ="message-image" src = {this.props.message.message}/>
        </span>
      </div>
      );
    } else {
      return (
      <div className={this.props.message.cssClass}>
        <span className="message-username" style={{color: this.props.message.usercolor}}>{this.props.message.user}</span>
        <span className="message-content">{this.props.message.message}</span>
      </div>
      );
    }
  }
}
export default Message;