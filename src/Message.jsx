import React, {Component} from 'react';

class Message extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={this.props.message.cssClass}>
        //{console.log(this.props.message.usercolor)}
        <span className="message-username" style={{color: this.props.message.usercolor}}>{this.props.message.user}</span>
        <span className="message-content">{this.props.message.message}</span>
      </div>
    );
  }
}
export default Message;