import React, {Component} from 'react';

class Message extends Component {
  render() {
    // if (this.props.type === 'Notification') {
    //   return (
    //     <div className="message">
    //       <span className="message-username ${this.props.colour}">{this.props.username}</span>
    //       <span className="message-content">{this.props.content}</span>
    //     </div>
    //   );
    // } else {
      console.log("I'm in messages!!!!!",this.props.type, this.props.content);
    if (this.props.type === 'Chat') {
      return (
        <div className="message">
          <span className={`message-username ${this.props.colour}`}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">{this.props.content}</div> 
      );
    }
  }
 }
// }

export default Message;