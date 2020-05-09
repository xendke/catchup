import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './ChatBox.css';

import { Segment } from 'semantic-ui-react';
import Messages from '../components/Messages';
import InputForm from '../components/InputForm';
import Username from '../components/Username';

const scrollBoxStyles = {
  overflowY: "auto",
  minHeight: 250,
  maxHeight: "calc(80vh - 80px)"
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
    const messagesRef = firebase.database().ref("messages").limitToLast(15);

    messagesRef.on('child_added', (data) => {
      this.setState((prevState, props) => {
        const prevMessages = prevState.messages.slice();
        prevMessages.push({
          key: data.key,
          data: data.val(),
          align: data.val().uid === props.uid ? 'right': 'left'
        });

        return { messages: prevMessages };
      }, this.setState(() => ({
          loading: false
        }))
      );
    });
  }

  componentDidUpdate() {
    this.jumpToBottom();
  }

  render() {
    const { uid, username } = this.props;
    return (
      <div className="ChatBox">
        <Username username={username}/>
        <Segment loading={this.state.loading}>
          <div ref={(ref) => this.divScroll = ref} style={scrollBoxStyles}>
            <Messages messages={this.state.messages} />
          </div>
        </Segment>
        <InputForm uid={uid} username={username}/>
      </div>
    );
  }
}

export default ChatBox;
