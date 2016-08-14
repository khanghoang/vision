import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import makeID from '../helpers/makeID';

import 'brace/mode/java';
import 'brace/theme/github';

class CodeEditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  onChange = (value) => {
    this.setState({
      value: value
    })
    this.props.onChange(value);
  }

  render() {
    return (
      <AceEditor
        mode="java"
        theme="github"
        onChange={this.onChange}
        value={this.state.value}
        name={`codeEditor+${makeID()}`}
        editorProps={{$blockScrolling: true}}
        height="200px"
        width="100%"
        />
    )
  }
}

export default CodeEditorComponent;
