var s = document.createElement('script');
s.src = chrome.extension.getURL('./app/script/backgroundSinon.js');
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
}, false);
