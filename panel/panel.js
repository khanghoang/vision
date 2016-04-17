// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  sendRequestDataToDevTools(JSON.parse(msg.hello));
});

function sendRequestDataToDevTools(data) {
  window.onDataChange && window.onDataChange(data);
}
