import "babel-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/containers/appTest';

ReactDOM.render((<App />), document.getElementById('container'));
