import React, {Component} from 'react';
import { sendObjectToInspectedPage } from '../../messaging';
import sendObjectToDevTools from '../../messageback-script';

require('../../panel/panel.js');

class App extends Component {

  constructor() {
    super();
    this.enableXHR = this.enableXHR.bind(this);
    this.disableXHR = this.disableXHR.bind(this);

    this.state = {
      requests: []
    }
  }

  componentDidMount() {
    // debugger;
    window.onDataChange = (data) => {
      this.setState({requests: data})
    }
  }

  enableXHR() {
    var id = chrome.runtime.id;

    var command = `
      this.xhr = sinon.useFakeXMLHttpRequest();\
      this.xhr.onCreate = function (xhr) {\
        requests.push(xhr);
        window.postMessage({hello: JSON.stringify(requests)}, '*');
      };
    `;

    chrome.devtools.inspectedWindow.eval(
      command,
      function(result, isException) {
        console.log(result, isException);
      }
    );

    sendObjectToInspectedPage({action: "code", content: "console.log('ENABLED')"});
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

    sendObjectToInspectedPage({action: "code", content: "console.log('RESTORED')"});
  }

  render() {

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

              debugger;
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
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
            <button onClick={this.enableXHR} type="button" className="btn btn-success">Enable XHR</button>
            <button onClick={this.disableXHR} type="button" className="btn btn-danger">Disable XHR</button>
          </form>
        </nav>
        {groupBtns}
      </div>
    );
  }
}

export default App;
