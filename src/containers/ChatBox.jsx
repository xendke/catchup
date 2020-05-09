import React, { Component } from 'react';
import * as firebase from 'firebase';
import './ChatBox.css';

import { Segment } from 'semantic-ui-react';
import Messages from '../components/Messages';
import InputForm from '../components/InputForm';

class ChatBox extends Component {
  state = {
    messages: [],
    loading: true
  }

  jumpToBottom = () => {
    this.divScroll.scrollTop = this.divScroll.scrollHeight;
  }

  componentDidMount() {
    const messagesRef = firebase.database().ref("messages").limitToLast(15);

    messagesRef.on('child_added', (data) => {
      this.setState((prevState, props) => {
        this.setState(() => ({
          loading: false
        }));

        const prevMessages = prevState.messages.slice();
        prevMessages.push({
          key: data.key,
          data: data.val(),
          align: data.val().uid === props.uid ? 'right': 'left'
        });

        return { messages: prevMessages };
      });
    });
  }

  componentDidUpdate() {
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
