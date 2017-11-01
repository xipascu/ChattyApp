import React, {Component} from 'react';

  //message is being sent to MessageList.jsx
class Message extends Component {
  render() {

    return (
    <div>
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        <div className="message system">
          {/* Anonymous1 changed their name to nomnom. */}
        </div>     
    </div>  
    )
  }
}

export default Message;
