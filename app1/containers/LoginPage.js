import { connect } from 'react-redux';
import {loginIfNeeded} from '../actions';
import {Navigation} from 'react-router';
import {Input, Button, Label} from 'react-bootstrap';
var React = require('react');
import { Component, PropTypes } from 'react';

require("!style!css!less!./LoginPage.less");

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // if user already login, redirect to MainPage
    if(this.props.token) {
      this.context.router.transitionTo('MainPage');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.token) {
      this.context.router.transitionTo('MainPage');
    }
  }

  handleLogin(username) {
    this.props.dispatch(loginIfNeeded(username));
  }

  handleLoginClick(e) {
    e.preventDefault();
    let username = React.findDOMNode(this.refs.inputUsername).getElementsByTagName("input")[0].value;
    this.handleLogin(username);
  }

  render() {
    const { isLoading, errorMessage } = this.props;
    return (
      <form className="form-signin">
        <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputUsername" class="sr-only">Username</label>
          <Input
          type="text"
          placeholder="Enter your name"
          ref="inputUsername"
          labelClassName='label-class'
          />
          <Button
          bsStyle='primary'
          disabled={isLoading}
          onClick={!isLoading ? this.handleLoginClick.bind(this) : null}>
          {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <br/>
          <Label bsStyle="danger">
          {errorMessage ? errorMessage : ""}
          </Label>
      </form>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

LoginPage.contextTypes = {
    router: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let { currentUser } = state;
  currentUser = currentUser || {};
  let { isLoading, errorMessage } = currentUser;
  const token = currentUser.token;
  return {
    currentUser,
    token,
    isLoading,
    errorMessage
  };
}

export default connect(mapStateToProps)(LoginPage);

