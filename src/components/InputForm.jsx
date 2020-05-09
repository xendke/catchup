import React, { Component } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import * as firebase from 'firebase';

class InputForm extends Component {
  state = {
    input_text: ""
  }

  handleInputChange = (e) => {
    const newValue = e.target.value;
    this.setState(() => ({ input_text: newValue }));
  }

  handleButtonClick = (e) => {
    e.preventDefault();

    if(this.state.input_text.trim() === "") {
      return;
    }

    const newPostRef = this.messagesRef.push();
    newPostRef.set({
      text: this.state.input_text,
      uid: this.props.uid,
      username: this.props.username
    });

    this.setState(() => ({
      input_text: ""
    }));
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

export default InputForm;