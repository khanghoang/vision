import React, { Component } from 'react';

export default class FieldArea extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: ''
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    this.props.onKeyChange && this.props.onKeyChange(e);
  }

  reset() {
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <div>
        <label>{this.props.prefixText}</label>
        <textarea
          className='form-control'
          rows="3"
          type={this.props.inputType}
          onBlur={this.props.onBlur}
          onKeyUp={this.props.onKeyUp}
          onChange={this.onChange}
          onKeyPress={this.props.onKeyPress}
          value={this.state.value}
          />
        </div>
    )
  }
}

FieldArea.propTypes = {
  prefixText: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  onKeychange: React.PropTypes.func,
  onKeyPress: React.PropTypes.func
}
