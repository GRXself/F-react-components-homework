import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };

  handleClick = () => {
    this.props.onSend(this.state.userInput);

    this.setState({
      userInput: '',
    });
  };

  handleEnter = (event) => {
    if (event.key === 'Enter') this.handleClick();
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleInputChange}
          onKeyDown={this.handleEnter}
        />
        <button type="button" onClick={this.handleClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
