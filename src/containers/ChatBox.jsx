import React, { Component } from 'react';
import * as firebase from 'firebase';
import './ChatBox.css';

import { Input, Button, Icon, Segment } from 'semantic-ui-react';

class InputForm extends Component {
  state = {
    input_text: ""
  }
  handleInputChange = (e) => {
    this.setState({input_text: e.target.value});
  }
  handleButtonClick = (e) => {
    e.preventDefault();
    console.log("sending: "+this.state.input_text);
    if(this.state.input_text === "") {
      return;
    }
    var newPostRef = this.messagesRef.push();
    newPostRef.set({text: this.state.input_text, uid: this.props.uid});
    this.setState({
      input_text: ""
    });
  }
  componentDidMount() {
    this.messagesRef = firebase.database().ref("messages");
  }
  render() {
    return (
      <div className="InputForm">
        <form >
          <Input
          className="Input"
          label={<Button onClick={this.handleButtonClick}><Icon size='large' name='send' />Send</Button>}
          labelPosition="right"
          value={this.state.input_text}
          onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

class Messages extends Component {
  render() {
    return (
      <Segment.Group>{this.props.messages.map((message) =>
        <Segment size='small' key={message.key} textAlign={message.align}>
          {message.align==="left"? <div><Icon size='large' name='user circle' />{message.data.uid}</div> : null}
          {message.data.text}
          {message.align==="left"? null : <Icon size='large' name='chevron left' />}
        </Segment>
      )}
      </Segment.Group>
    );
  }
}

class ChatBox extends Component {
  state = {
    messages: [],
    loading: true
  }
  jumpToBottom = () => {
    this.divScroll.scrollTop = this.divScroll.scrollHeight;
  }
  componentDidMount() {
    var messagesRef = firebase.database().ref("messages").limitToLast(15);
    messagesRef.on('child_added', (data) => {
      this.setState((prevState, props) => {
        this.setState({
          loading: false
        });
        var prevMessages = prevState.messages.slice();
        var align = "left";
        if(data.val().uid === this.props.uid) {
          align = "right";
        }
        prevMessages.push({key: data.key, data: data.val(), align: align});
        return {messages: prevMessages};
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    this.jumpToBottom();
  }
  render() {
    return (
      <div className="ChatBox">
        <Segment loading={this.state.loading}>
        <div ref={(ref) => this.divScroll = ref} style={{overflowY: "auto", height:500}}>
          <Messages messages={this.state.messages} />
        </div>
        </Segment>
        <InputForm uid={this.props.uid}/>
      </div>
    );
  }
}
export default ChatBox;
