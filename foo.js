console.log('foo content script');

// window.xhr = sinon.useFakeXMLHttpRequest();
// console.log(window.sinon);
// console.log(window.XMLHttpRequest);
//
// var requests = [];
//
// xhr.onCreate = function (xhr) {
//   requests.push(xhr);
//   debugger;
// };

var s = document.createElement('script');
s.src = chrome.extension.getURL('sinon.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || !message.hello) {
    return;
  }

  chrome.runtime.sendMessage(message);
});
