/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/khanghoang/Documents/old-vision/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/khanghoang/Documents/old-vision/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	// Chrome automatically creates a background.html page for this to execute.
	// This can access the inspected page via executeScript
	// 
	// Can use:
	// chrome.tabs.*
	// chrome.extension.*
	
	chrome.extension.onConnect.addListener(function (port) {
	
	  var extensionListener = function extensionListener(message, sender, sendResponse) {
	
	    if (message.tabId && message.content) {
	
	      if (message.action === 'message') {
	        console.log('message', message.content);
	        return;
	      }
	
	      //Evaluate script in inspectedPage
	      if (message.action === 'code') {
	        chrome.tabs.executeScript(message.tabId, { code: message.content });
	
	        //Attach script to inspectedPage
	      } else if (message.action === 'script') {
	        chrome.tabs.executeScript(message.tabId, { file: message.content });
	
	        //Pass message to inspectedPage
	      } else {
	        chrome.tabs.sendMessage(message.tabId, message, sendResponse);
	      }
	
	      // This accepts messages from the inspectedPage and 
	      // sends them to the panel
	    } else {
	      // The Vision data sent from injected code back
	      // to backgroun page
	      port.postMessage(message);
	    }
	
	    sendResponse(message);
	  };
	
	  // Listens to messages sent from the panel
	  chrome.extension.onMessage.addListener(extensionListener);
	
	  port.onDisconnect.addListener(function (port) {
	    chrome.extension.onMessage.removeListener(extensionListener);
	  });
	
	  port.onMessage.addListener(function (message) {
	    port.postMessage(message);
	  });
	});
	
	var connections = {};
	
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/khanghoang/Documents/old-vision/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "background.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }
/******/ ]);
//# sourceMappingURL=background.js.map