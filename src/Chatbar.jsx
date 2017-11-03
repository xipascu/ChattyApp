import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userSoFar: this.props.currentUser,  // answer-so-far in username field
      content: '',      // the answer-so-far in the message field
    }
    console.log(this.props)
  }

  userChange = (event) => {
    console.log(event.target.value);
    this.setState({userSoFar: event.target.value});
  }

  handleMessageKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.onNewMsg(event.target.value, this.state.userSoFar);
      event.target.value = ''
    }
  }

  handleNameKeyPress = (event) => {
    if (event.key == 'Enter'){
      this.props.onNewUsername(this.state.userSoFar);
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue= {this.state.userSoFar}
            onChange={this.userChange}
            onKeyPress={this.handleNameKeyPress}
          />
          <input
            className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
            onKeyPress={this.handleMessageKeyPress}
          />
        </footer>
      </div>
    )
  }
}

export default Chatbar;