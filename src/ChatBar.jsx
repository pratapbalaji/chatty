import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
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
       var messageInput = document.getElementById('chatbar-message');
       messageInput.addEventListener('keypress', (event) => {
         if (event.which === 13) {
          var messageObject = {
            type: 'postMessage',
            user: document.getElementById('chatbar-username').value,
            message: messageInput.value,
            usercolor: this.props.usercolor
          }
          this.props.socket.send(JSON.stringify(messageObject));
          messageInput.value = '';
         }
       });
       var messageUser = document.getElementById('chatbar-username');
       var userA = messageUser.value;
       messageUser.addEventListener('keypress', (event) => {
        if (event.which === 13) {
          var userB = messageUser.value;
          this.props.updateUser(userB);
          var messageObject = {
            type: 'postNotification',
            userA: userA,
            userB: userB
          }
          this.props.socket.send(JSON.stringify(messageObject));
          userA = userB;
        }
       });
     };
}
export default ChatBar;