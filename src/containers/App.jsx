import React, { Component } from 'react';
import './App.css';
import ChatBox from 'containers/ChatBox';
import * as firebase from 'firebase';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

class App extends Component {
  state = {
    username: null,
    uid: null
  }

  componentDidMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.displayName) {
        this.setState(() => ({ uid: user.uid, username: user.displayName}));
      } else if (user && !user.displayName) {
        const uniqueName = uniqueNamesGenerator({ dictionaries: [ colors, animals ], length: 2 });

        user.updateProfile({
          displayName: uniqueName
        }).then(() => {
          this.setState(() => ({ uid: user.uid, username: uniqueName }))
        })
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
    const { uid, username } = this.state;
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>catchup</h2>
        </div>
        <ChatBox uid={uid} username={username}/>
      </div>
    );
  }
}

export default App;
