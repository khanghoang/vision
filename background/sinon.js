import sinon from 'sinon';

window.sinon = sinon;
window.requests = [];

window.__vision_onCreateCallback = (xhr) => {
  setTimeout(_ => {
    xhr.respond(200, { "Content-Type": "application/json" },
                '{ "id": 12, "comment": "Hey there", "token": "123"}');
  }, 0);
}
