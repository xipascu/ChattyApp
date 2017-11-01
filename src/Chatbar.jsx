import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    console.log(this.props.currentUser.name);
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser.name} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      </div>
    )
  }
}

export default Chatbar;