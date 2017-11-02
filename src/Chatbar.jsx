import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      content: ''
    }
  // this.onContent = this.onContent.bind(this);
    console.log(this.props)
  }


  // onContent(event) {
  //   this.setState({
  //     content: event.target.value  
  //   });
  // }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      // console.log(event.target.value)
      this.props.onNewMsg(event.target.value);
      event.target.value = ''
    }
  }

  render() {
    console.log(this.props.currentUser.name);

    return (

      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser.name} />
          <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          
          onKeyPress={this.handleKeyPress} />
        </footer>
      </div>
    )
  }
}

export default Chatbar;