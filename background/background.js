// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*

import Bar from '../bar';

chrome.extension.onConnect.addListener(function (port) {

  var extensionListener = function (message, sender, sendResponse) {

    if(message.tabId && message.content) {

      if (message.action === 'message') {
        console.log('message', message.content);
        return;
      }

      //Evaluate script in inspectedPage
      if(message.action === 'code') {
        chrome.tabs.executeScript(message.tabId, {code: message.content});

        //Attach script to inspectedPage
      } else if(message.action === 'script') {
        chrome.tabs.executeScript(message.tabId, {file: message.content});

        //Pass message to inspectedPage
      } else {
        chrome.tabs.sendMessage(message.tabId, message, sendResponse);
      }

      // This accepts messages from the inspectedPage and 
      // sends them to the panel
    } else {
      console.log('xhr data', message.hello);
      port.postMessage(message);
    }
    sendResponse(message);
  }

  // Listens to messages sent from the panel
  chrome.extension.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function(port) {
    chrome.extension.onMessage.removeListener(extensionListener);
  });

  port.onMessage.addListener(function (message) {
    port.postMessage(message);
  });

});

var connections = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('incoming message from injected script');
  console.log(request);

  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});



