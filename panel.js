// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

document.querySelector('#executescript').addEventListener('click', function() {
  sendObjectToInspectedPage({action: "code", content: "console.log('Inline script executed')"});
}, false);

document.querySelector('#enableXHR').addEventListener('click', function() {
  var command = `
  this.xhr = sinon.useFakeXMLHttpRequest();
  this.xhr.onCreate = function (xhr) {
    requests.push(xhr);
  };
  `;

  chrome.devtools.inspectedWindow.eval(
    command,
    function(result, isException) {
      console.log(result, isException);
    }
  );

  sendObjectToInspectedPage({action: "code", content: "console.log('ENABLED')"});
}, false);

document.querySelector('#disableXHR').addEventListener('click', function() {
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
}, false);

document.querySelector('#insertscript').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
}, false);

document.querySelector('#insertmessagebutton').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "code", content: "document.body.innerHTML='<button>Send message to DevTools</button>'"});
    sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
}, false);
