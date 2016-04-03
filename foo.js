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
