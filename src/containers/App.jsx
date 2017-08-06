import React, { Component } from 'react';
import './App.css';
import ChatBox from 'containers/ChatBox';
import * as firebase from 'firebase';

class App extends Component {
  state = {
    username: null,
    uid: null
  }
  componentDidMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          uid: user.uid
        });
      }
    });
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error);
    });
  }
  componentWillUnmount() {
    this.authListener();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>catchup</h2>
        </div>
        <ChatBox uid={this.state.uid}/>
      </div>
    );
  }
}

export default App;
