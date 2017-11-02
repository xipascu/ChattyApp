import React, {Component} from 'react';
import "../styles/application.scss";
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: 'You' }, 
      messages: []
    };

    this.onNewMsg = this.onNewMsg.bind(this);
  }



  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
      this.socket.onopen = (event) => {
        // this.socket.send('Connected to server....');
      console.log('where you at bro')
      }
    this.socket.addEventListener('message', event => {
      console.log(event.data)
      this.setState({messages: this.state.messages.concat(JSON.parse(event.data))});
    });
  }

  onNewMsg(content) {
    if (content.length < 1) return; 
    // this.socket.send(content);
    console.log(content);
    const newMsg = { id: Math.random()*100000, username: this.state.currentUser.name, content};
    // const messages = this.state.messages.concat(newMsg)
    // this.setState({messages: messages})
      this.socket.send(JSON.stringify(newMsg));
   }

  

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <Chatbar currentUser = {this.state.currentUser} onNewMsg = {this.onNewMsg} />
      </div>
    );
  }
 }


/*
  1.   Copy html layout into App.jsx.   \/
  2.   Convert class and other reserved names to React versions. \/
  3.   Break html into separate components to create a hierarchy. \/
  4.   Add state to App.jsx to manage the current posts. \/
  5.   Pass the posts to the child components as a prop.
  6.   In the posts series component map over the posts array.
  7.   In the posts component use the prop to replace the static content.
  8.   In the header setup the content state.
  9.   Pass the current and maximum character count to the status bar as props.
  10.  In the status bar render the character counter, changing the style when max is reached.
  11.  Setup an event handler to trigger an update to the content on input.
  12.  Pass a function to the header that it can call when a new post is created.
  13.  Setup an event handler to use the function, passed as a prop.
  14.  In the header create the error state and pass it as a prop to the status.
  15.  Show the error text if it is not empty.
  16.  Switch from hard coded posts to json that uses a fetch (ajax) call.
  17.  Save the new post to the database in the App.jsx post handler function.
  18.  Toggle the visibility of the compose window.
*/


export default App;
