import React, {Component} from 'react';
import "../styles/application.scss";
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentUser: '', // the name I send as in here
      messages: []
    };
    this.onNewMsg = this.onNewMsg.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      // this.socket.send('Connected to server....');
      console.log('where you at bro')
    }
    this.socket.addEventListener('message', event => {
      console.log(event.data)
      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      });
      console.log("number of messages:", this.state.messages.length);
    });
  }

  onNewMsg(content) {
    var username = this.state.currentUser;
    if (content.length < 1)  return; 
    if (username === '') {
      username = 'Anonymous';
    }
    console.log(content);
    const newMsg = { 
      type: 'Chat', 
      username, content 
    }; 
    this.socket.send(JSON.stringify(newMsg));
  }

  onNewUsername(username) {
    console.log('Username', username);
      const oldName = this.state.currentUser ? this.state.currentUser : "Anonymous";
      const newName = username;
    if (newName != oldName) {
      this.setState({currentUser: newName});
      const content = `${oldName} has changed their name to ${newName}`;
      const newMsg  = {
        type: 'Notification',
        content
      }
      console.log(newMsg)
      this.socket.send(JSON.stringify(newMsg));    
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <Chatbar 
          currentUser = {this.state.currentUser}
          onNewMsg = {this.onNewMsg}
          onNewUsername = {this.onNewUsername}
        />
      </div>
    );
  }
 }


export default App;
