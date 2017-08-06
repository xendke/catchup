import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Styles
import './index.css';

// Components
import App from 'containers/App';

// Firebase
import * as firebase from 'firebase';
import fbconfig from 'firebase/config';
firebase.initializeApp(fbconfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
