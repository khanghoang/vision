// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

document.querySelector('#executescript').addEventListener('click', function() {
  sendObjectToInspectedPage({action: "code", content: "console.log('Inline script executed')"});
}, false);

document.querySelector('#enableXHR').addEventListener('click', function() {

  var id = chrome.runtime.id;
  sendObjectToInspectedPage({action: "script", content: "bar.js"});

  var command = `
  // Object.observe(window.requests, function() {
  //   document.__sendObjectToDevTools({content: "on change"});
  // })
  this.xhr = sinon.useFakeXMLHttpRequest();\
  this.xhr.onCreate = function (xhr) {\
    requests.push(xhr);
    window.postMessage({hello: JSON.stringify(xhr)}, '*');
    // chrome.extension.sendMessage('` + id + `', {hello: 'world'}, function() {
    //   console.log('sent a message!!');
    // });
    // var port = chrome.runtime.connect('` + id +`');
    // port.postMessage({hello: 'there'});
    // document.__sendObjectToDevTools({content: "on change"});
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

var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  add('button', 'Response with mock data');
});

function add(type, name) {
    //Create an input type dynamically.   
    var element = document.createElement("input");
    //Assign different attributes to the element. 
    element.type = type;
    element.value = name; // Really? You want the default value to be the type string?
    element.onclick = function() { // Note this is a function
      var command = `
      window.requests[0].respond(200, { "Content-Type": "application/json" },
                                 '{ "id": 12, "comment": "Hey there", "token": "123"}');
      `;

      chrome.devtools.inspectedWindow.eval(
        command,
        function(result, isException) {
          console.log(result, isException);
        }
      );
    };

    var foo = document.getElementById("container");
    //Append the element in page (in span).
    foo.appendChild(element);
}
