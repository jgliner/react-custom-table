require("babel-polyfill");
require("babel-register");

import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App.js';
require('./tableStyles.css');

ReactDOM.render(<App />, document.getElementById('app'));
