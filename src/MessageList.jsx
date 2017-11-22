import React, {Component} from 'react';
import Message from "./Message.jsx"

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return <Message
        key       = { message.id }
        username  = { message.username }
        content   = { message.content } 
        type      = { message.type } 
        colour    = { message.colour } 
      /> 
    });

    return (
      <div>
        <main className="messages">
          { messages }
        </main>
      </div>  
    )
  }
}

export default MessageList;
