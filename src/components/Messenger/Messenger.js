import React from "react";
import { nanoid } from "nanoid";
import MesList from "../MesList/MesList";
import Form from "../Form/Form";
import * as ReactDOM from 'react-dom';


export default class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.url = process.env.REACT_APP_MESSAGES
    this.state = {
      messages: [],
      lastMesID: 0,
      userID: window.localStorage.getItem('userID') || nanoid()
    }
    this.timerID = null;
    this.refDiv = React.createRef();
    this.serverPoling = this.serverPoling.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  scrollToBottom() {
    const messagesContainer = ReactDOM.findDOMNode(this.refDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  componentDidMount() {
    window.localStorage.setItem('userID', this.state.userID);
    this.serverPoling();
    this.timerID = setInterval(this.serverPoling, 3000);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async addMessage(message) {
    try {
      await fetch(`${this.url}/messages`, {
        method: 'POST',
        body: JSON.stringify({
          id: this.state.lastMesID + 1,
          userID: this.state.userID,
          content: message,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      this.serverPoling();
    } catch (err) {
      console.error(err);
    }
  }

  async serverPoling() {
    const request = await
      fetch(`${this.url}/messages?from=${this.state.lastMesID}`);
    const response = await request.json();
    if (response.length !== 0) {
      const lastReceivedID = response[response.length - 1].id;
      if (lastReceivedID !== this.state.lastMesID) {
        this.setState({ ...this.state, messages: [...this.state.messages, ...response], lastMesID: lastReceivedID })
      }
    }
  }

  render() {
    return (
      <div className="app container">
        <MesList ref={(el) => { this.refDiv = el; }} messages={this.state.messages} />
        <Form addMesHandler={this.addMessage} />
      </div>
    )
  }
}
