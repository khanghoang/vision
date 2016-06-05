import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

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
        name="codeEditor"
        editorProps={{$blockScrolling: true}}
        />
    )
  }
}

export default CodeEditorComponent;
