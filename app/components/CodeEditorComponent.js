import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

class CodeEditorComponent extends Component {
  render() {
    return (
      <AceEditor
        mode="java"
        theme="github"
        onChange={this.props.onChange}
        name="codeEditor"
        editorProps={{$blockScrolling: true}}
        />
    )
  }
}

export default CodeEditorComponent;
