import sinon from 'sinon';
import queryString from 'query-string';
import _ from 'lodash';

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

