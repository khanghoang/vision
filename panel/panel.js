var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  sendRequestDataToDevTools(JSON.parse(msg.hello));
});

function sendRequestDataToDevTools(data) {
  window.onDataChange && window.onDataChange(data);
}
