import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.appendMessage = this.appendMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://127.0.0.1:3001');
    this.socket.onopen = () => {
      console.log('got a connection into App.jsx');
      this.socket.onmessage = (messageEvent) => {
        const message = JSON.parse(messageEvent.data);
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
    console.log("Rendering App");
    console.log(this.state.currentUser);
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} updateUser={this.updateUser}/>
      </div>
    );
  }
}

export default App;
