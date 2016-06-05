/*
 * This file contains all the core functions of The Vision,
 * mostly the functions that used to communite between Vision
 * and the injected site.
 */

const enableXHR = () => {
  const id = chrome.runtime.id;
  const command = `
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
  )
}

const disableXHR = () => {
  const command = `
  xhr.restore();
  `;

  chrome.devtools.inspectedWindow.eval(
    command,
    function(result, isException) {
      console.log(results, isException);
    }
  );
}

const executeRequestWithID = (id) => {
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
