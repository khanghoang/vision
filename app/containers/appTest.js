import React, {Component} from 'react';


// require('../../panel/panel.js');
// ^^ correct code above

class App extends Component {

  constructor() {
    super();
    this.enableXHR = this.enableXHR.bind(this);
    this.disableXHR = this.disableXHR.bind(this);

    this.state = {
      requests: [],
      patterns: []
    }

    this.addPattern = this.addPattern.bind(this);
  }

  componentDidMount() {
    // debugger;
    window.onDataChange = (data) => {
      console.table(data);
      this.setState({requests: data})
    }
  }

  addPattern(e) {
    e.preventDefault();

    // get url
    const pattern = {
      url: this.refs.input.value
    };

    const newPatterns = [...this.state.patterns, pattern];
    this.setState({
      patterns: newPatterns
    }, _ => {
      this.refs.input.value = '';
    });
  }

  enableXHR() {
    var id = chrome.runtime.id;

    var command = `
      this.xhr = sinon.useFakeXMLHttpRequest();\
      this.xhr.onCreate = function (xhr) {\
        requests.push(xhr);
        window.postMessage({hello: JSON.stringify(requests)}, '*');
        setTimeout(_ => {
          window.__vision_onCreateCallback(xhr);
        }, 0);
      };
    `;

    chrome.devtools.inspectedWindow.eval(
      command,
      function(result, isException) {
        console.log(result, isException);
      }
    );
  }

  disableXHR() {
    var command = `
      xhr.restore();
    `;

    chrome.devtools.inspectedWindow.eval(
      command,
      function(result, isException) {
        console.log(results, isException);
      }
    );
  }

  render() {

    const groupPatterns = this.state.patterns.map((pattern) => {
      return (
        <li>{pattern.url}</li>
      )
    });

    const groupBtns = this.state.requests.map(() => {
      return (
        <button
          onClick={
            () => {
              // command to trigger to response the request
              const command = `
                console.log('click button');
                window.requests[0].respond(200, { "Content-Type": "application/json" },
                                         '{ "id": 12, "comment": "Hey there", "token": "123"}');
              `;

              chrome.devtools.inspectedWindow.eval(
                command,
                function(result, isException) {
                  console.log(result, isException);
                }
              );
            }
          }
          type="button"
          className="btn btn-success">
          Release the request
        </button>
      )
    });

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <h2>The Vision</h2>
              </a>
            </div>
          </div>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input ref='input' type="text" className="form-control" placeholder="Search" />
            </div>
            <button
              onClick={this.addPattern}
              type="submit"
              className="btn btn-default">
              Submit
            </button>
          </form>
          <button onClick={this.enableXHR} type="button" className="btn btn-success">Enable XHR</button>
          <button onClick={this.disableXHR} type="button" className="btn btn-danger">Disable XHR</button>
        </nav>
        <ul>
          {groupPatterns}
        </ul>
        {groupBtns}
      </div>
    );
  }
}

export default App;
