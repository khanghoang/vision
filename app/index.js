import "babel-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppTest from '../app/containers/appTest';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <AppTest />
  </MuiThemeProvider>
);

ReactDOM.render((<App />), document.getElementById('container'));
