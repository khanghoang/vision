import React, { Component } from 'react';
import Field from '../containers/Field';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import CodeEditorComponent from '../components/CodeEditorComponent';

const style = {
  margin: 12,
};

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
      ignoreParameters: false,
      status: ''
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
        this.setState({status: value})
        break;
      }
      case 'text':
      case 'codeEditor': {
        const newResponse = _.assign({}, this.state.response, {text: value});
        this.setState({response: newResponse})
        break;
      }
      case 'headers': {
        this.setState({headers: value})
        break;
      }
    }
  }

  onCheckBoxChange() {
    this.setState({ignoreParameters: !this.state.ignoreParameters});
  }

  onSubmit(e) {
    e && e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {

    const self = this;

    function _onChange(name) {
      return function(value) {
        const args = arguments;
        let finalValue;
        if (name === 'text' || name === 'codeEditor') {
          finalValue = arguments[0];
        } else {
          finalValue = arguments[1];
        }

        const newArgs = [name, finalValue];
        self.onValueChange(...newArgs);
      }
    }

    return (
      <form>
        {!this.props.compad ?
          (
            <div>
              <TextField
                id="text-field-controlled"
                hintText="HTTP Method (ex: POST, GET...)"
                onChange={_onChange('method')}
                name='method'
                ref='method'
                key='method'
                fullWidth={true}
                />
                <TextField
                  id="text-field-controlled"
                  hintText="URL (ex: https://google.com/abc)"
                  onChange={_onChange('url')}
                  name='url'
                  ref='url'
                  key='url'
                  fullWidth={true}
                  />
                  <TextField
                    id="text-field-controlled"
                    hintText="Custom header"
                    onChange={_onChange('headers')}
                    name='headers'
                    ref='headers'
                    key='headers'
                    fullWidth={true}
                    />
                    <Toggle
                      label="Ignore parameters"
                      labelPosition="right"
                      type="checkbox"
                      ref="checkbox"
                      name='checkbox'
                      key='checkbox'
                      onToggle={this.onCheckBoxChange}
                      />
                    </div>
        ) : null}
        <TextField
          id="text-field-controlled"
          hintText="HTTP status code (ex: 200, 401, 500...)"
          onChange={_onChange('status')}
          name='status'
          ref='status'
          key='status'
          fullWidth={true}
        />
        <CodeEditorComponent
          onChange={_onChange('text')}
          name='text'
          ref='text'
          key='text'
          />
        {
        !this.props.compad ?
        (<RaisedButton
          label="Create request"
          primary={true}
          onClick={this.onSubmit}
          style={style}
          />
          ) : null
        }
        </form>
    )
  }
}

export default CreatePatternForm;
