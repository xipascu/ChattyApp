import React, {Component} from 'react';

  //message is being sent to MessageList.jsx
class Message extends Component {
  render() {
    if (this.props.type === "Chat") {
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else {
      return (        
        <div className="message system">
          {this.props.content}
        </div> 
      );
    }
  }
}

export default Message;
