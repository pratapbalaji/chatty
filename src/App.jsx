import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
       {
         username: "Bob",
         content: "Has anyone seen my marbles?",
       },
       {
         username: "Anonymous",
         content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
       }
     ]
    };
    this.appendMessage = this.appendMessage.bind(this);
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

  render() {
    console.log("Rendering App");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} appendMessage={this.appendMessage}/>
      </div>
    );
  }
}

export default App;
