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
        <input className="chatbar-message" id="chatbar-message" placeholder = "Type your message here and hit ENTER" />
      </footer>
    )
  }

  componentDidMount() {
     this.socket = new WebSocket('ws://localhost:3001');
     this.socket.onopen = () => {
       console.log('got a connection');
       var messageInput = document.getElementById('chatbar-message');
       messageInput.addEventListener('keypress', (event) => {
         if (event.which === 13) {
          var messageObject = {
            user: document.getElementById('chatbar-username').value,
            message: messageInput.value
          }
          this.socket.send(JSON.stringify(messageObject));
          messageInput.value = '';
         }
       });

     };
   }
}
export default ChatBar;