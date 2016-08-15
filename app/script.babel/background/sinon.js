import sinon from 'sinon';
import queryString from 'query-string';
import _ from 'lodash';
import makeID from '../helpers/makeID';

window.sinon = sinon;
window.requests = [];
window.patterns = [];

const compareXHRWithPatterns = (xhr, pattern) => {

  // method
  if (xhr.method !== pattern.method) {
    return false;
  }

  // urlRegExp
  if (xhr.url !== pattern.url) {
    return false;
  }

  // parameters
  if (!pattern.ignoreParameters) {
    const getParamttersFromRequestBody = (requestBody) => {
      return queryString.parse(requestBody);
    }

    const parameters = getParamttersFromRequestBody(xhr.requestBody);

    if (!_.isEqual(parameters, pattern.parameters)) {
      return false;
    }
  }

  // response
  return true;
}

window.__makeID = makeID;

window.__removeRequestWithID = function(id) {
  var newRequests = window.requests.filter(function(q) {
    if (q._id !== id) {
      return q;
    }
  })

  window.requests = newRequests;
  window.postMessage({hello: JSON.stringify(window.requests)}, '*');
  chrome.runetime.sendMessage({hello: JSON.stringify(window.requests)}, (res) => {
    console.log(res);
  });
}


window.__returnOriginResultWithRequestID = function(id) {
  var i = 0;
  var request;
  if (!window.requests) return;
  for( i = 0; i < window.requests.length; i ++) {
    var q = window.requests[i];
    if (q._id === id) {
      request = q;
    }
  }

  sinon.FakeXMLHttpRequest.defake(request, [request.method, request.url, true, "", ""])
  request.send();
  window.__removeRequestWithID(id);
}

window.__returnMockResultWithRequestID = function(id, status, headerStr, responseStr) {
  var i = 0;
  var request;
  if (!window.requests) return;
  for( i = 0; i < window.requests.length; i ++) {
    var q = window.requests[i];
    if (q._id === id) {
      request = q;
    }
  }

  request && request.respond(status, headerStr, JSON.stringify(responseStr));
  window.__removeRequestWithID(id);
}

window.__vision_onCreateCallback = (xhr) => {
  patterns.forEach((p) => {
    if(compareXHRWithPatterns(xhr, p)) {
      setTimeout(_ => {
        const res = p.response;
        xhr.respond(
          res.status,
          res.headers,
          JSON.stringify(res.text)
        );
      }, 0);
    }
  });
}

