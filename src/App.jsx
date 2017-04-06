import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor() {
    super();
    this.socket = new WebSocket('ws://127.0.0.1:3001');
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      loggedInUsers: 0
    };
    this.appendMessage = this.appendMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('got a connection into App.jsx');
      this.socket.onmessage = (messageEvent) => {
        const message = JSON.parse(messageEvent.data);

        if (message.type === 'loggedInUsers') {
          this.setState({loggedInUsers: message.count})
        } else {
        let newMessageObject = {};
        switch (message.type) {
          case 'incomingNotification':
            newMessageObject = {
              cssClass: "message system",
              user: '',
              message: message.userA + " changed their name to " + message.userB
            }
          break;
          case 'incomingMessage':
            newMessageObject = {
              cssClass: "message",
              user: message.user,
              message: message.message
            }
          break;
        }
        let newMessages = this.state.messages;
        newMessages.push(newMessageObject);
        this.setState({
          messages: newMessages
        });
      }
      };
    }
  }

  appendMessage (message, user) {
    let newMessageObject = {
      username: user,
      content: message
    }
    let newMessages = this.state.messages;
    newMessages.push(newMessageObject);
    this.setState({
      messages: newMessages
    });
  }

  updateUser(user) {

    this.setState({
      currentUser: {name: user}
    });

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-users">{this.state.loggedInUsers} user(s) online</div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} updateUser={this.updateUser} socket={this.socket}/>
      </div>
    );
  }
}

export default App;
