import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userSoFar: this.props.currentUser,  
      content: '',      
      type: 'Chat'
    }
    console.log(this.props)
  }

  userChange = (event) => {
    this.setState({userSoFar: event.target.value});
  }

  handleMessageKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.onNewMsg(event.target.value, this.state.userSoFar);
      event.target.value = '';
    }
  }

    //to implement- onMouseLeave: the mouse leaves an element 
  handleNameKeyPress = (event) => {
    if (event.key == 'Enter'){
      if (this.state.userSoFar === '') {
        this.setState({userSoFar: 'Anonymous'});
      }
      this.props.onNewUsername(this.state.userSoFar);
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input
            className    = "chatbar-username"
            placeholder  = "Your Name (Optional)"
            defaultValue = {this.props.userSoFar}
            onKeyPress   = {this.handleNameKeyPress}
            onChange     = {this.userChange}
          />
          <input
            className    = "chatbar-message" 
            placeholder  = "Type a message and hit ENTER" 
            onKeyPress   = {this.handleMessageKeyPress}
          />
        </footer>
      </div>
    )
  }
}

export default Chatbar;