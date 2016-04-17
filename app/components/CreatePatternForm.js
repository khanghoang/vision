import React, { Component } from 'react';
import Field from '../containers/Field';
import _ from 'lodash';

class CreatePatternForm extends Component {
  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);

    this.state = {
      method: '',
      url: '',
      response: {},
      ignoreParameters: false
    }
  }

  onValueChange(inputName, value) {
    switch(inputName) {
      case 'method':
        this.setState({
          method: value
        })
        break;
      case 'url':
        this.setState({url: value})
        break;
      case 'status': {
        const newResponse = _.assign({}, this.state.response, {status: value});
        this.setState({response: newResponse})
        break;
      }
      case 'text': {
        let response = {};
        try {
          response = JSON.parse(value);
        } catch (e) {
          console.warn('Error when parsing response');
        }

        const newResponse = _.assign({}, this.state.response, {text: response});
        this.setState({response: newResponse})
        break;
      }
      case 'headers': {
        let headers = {};
        try {
          headers = JSON.parse(value);
        } catch (e) {
          console.warn('Error when parsing response');
        }

        const newResponse = _.assign({}, this.state.response, {headers: headers});
        this.setState({response: newResponse})
        break;
      }
    }
  }

  onCheckBoxChange() {
    this.setState({ignoreParameters: !this.state.ignoreParameters});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form>
        <Field
          inputType='text'
          onValueChange={this.onValueChange}
          name='method'
          ref='method'
          key='method'
        />
        <Field
          inputType='text'
          onValueChange={this.onValueChange}
          name='url'
          ref='url'
          key='url'
        />
        <Field
          inputType='number'
          onValueChange={this.onValueChange}
          name='status'
          ref='status'
          key='status'
        />
        <Field
          inputType='textarea'
          onValueChange={this.onValueChange}
          name='headers'
          ref='headers'
          key='headers'
        />
        <label>
          <input
            onChange={this.onCheckBoxChange}
            type="checkbox"
            ref="checkbox"
            name='checkbox'
            key='checkbox'
          />
            Ignore Paramters
          </label>
        <Field
          inputType='textarea'
          onValueChange={this.onValueChange}
          name='text'
          ref='text'
          key='text'
        />
        <button
          type='submit'
          onClick={this.onSubmit}
          >Create request</button>
        </form>
    )
  }
}

export default CreatePatternForm;
