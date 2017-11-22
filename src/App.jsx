import React, {Component} from 'react';
import "../styles/application.scss";
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentUser: {name: 'Anonymous'}, // the name I send as in here
      messages: [],
      type: 'Notification',
      userCountOn: 0,
      status: ''
    };
    this.onNewMsg = this.onNewMsg.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log('where you at bro')
    }
    this.socket.addEventListener('message', event => {
      const newData = JSON.parse(event.data);
      if (newData.type === 'Chat') {
        const data = this.state.messages.concat(newData);
        this.setState({type: 'Chat'});
      } else {
        this.setState({
          type: 'Notification'
        })
      }
      const eventData = this.state.messages.concat(newData);
      this.setState({
        userCountOn: newData.userSize,
        messages: eventData
      })
    });
  }

  onNewMsg(content, username) {
    if (content.length < 1)  return; 
    // if (username === '') {username = 'Anonymous';}
    // console.log(content);
    const newMsg = { 
      type: 'Chat', 
      username: this.state.currentUser.name,
      content 
    }; 
    this.socket.send(JSON.stringify(newMsg));
  }
 
  onNewUsername(username) {
    if (username != this.state.currentUser.name) {
      const content = `${this.state.currentUser.name} has change their username to ${username}.`;
      this.setState({currentUser: {name: username}});
      const newMsg = {type: 'Notification', content};
      this.socket.send(JSON.stringify(newMsg));
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChattyBratty</a>
          <span className="userCount">Users Online: {this.state.userCountOn}</span>
        </nav>
        <MessageList messages={this.state.messages} type={this.state.type} />
        <Chatbar 
          currentUser   = {this.state.currentUser.name}
          onNewMsg      = {this.onNewMsg}
          onNewUsername = {this.onNewUsername}
        />
      </div>
    );
  }
 }


export default App;