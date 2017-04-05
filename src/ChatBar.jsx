import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    let chatbarMessage = document.getElementById('chatbar-message').value;
    let chatbarUsername = document.getElementById('chatbar-username').value;
    this.props.appendMessage(chatbarMessage, chatbarUsername);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" id="chatbar-username" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" id="chatbar-message" placeholder = "Type your message here and hit ENTER" onKeyUp={(event) => {if(event.keyCode === 13) this.sendMessage()}}/>
      </footer>
    )
  }
}
export default ChatBar;