import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  customerInput = (text) => {
    const customerMessage = { role: ROLE.CUSTOMER, text };
    const messages = this.state.messages.concat(customerMessage);

    setTimeout(() => {
      this.setState({
        messages,
      });
      this.robotInput(text);
    });
  };

  robotInput = (customerInput) => {
    let text;
    answersData.forEach((answer) => {
      if (answer.tags.some((tag) => customerInput.includes(tag))) text = answer.text;
    });

    if (text) {
      const robotMessage = { role: ROLE.ROBOT, text };
      const messages = this.state.messages.concat(robotMessage);
      setTimeout(() => {
        this.setState({
          messages,
        });
      });
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onSend={this.customerInput} />
      </main>
    );
  }
}

export default Chat;
