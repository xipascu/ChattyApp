import React, {Component} from 'react';

class Chatbar extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      content: ''
    };
  }

  onUserChange = (name) => {
    this.setState({
      username:name.target.value
    })
  }

  onMessage = (msg) => {
    this.setState({
      content: msg.target.value
    });
  }

  submitNewMessage = (event) => {
    if (event.key === "Enter") {
      this.props.submitMessage(this.state)
      this.setState({content: ''})
    }
  }

  render() {
    console.log(this.props.currentUser.name);
    return (

      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser.name} />
          <input className  ="chatbar-message" 
          placeholder       ="Type a message and hit ENTER" 
          onKeyDown         = {this.submitNewMessage}
          onChange          = {this.onMessage}
          value             = {this.state.content}/>
        </footer>
      </div>
    )
  }
}

export default Chatbar;