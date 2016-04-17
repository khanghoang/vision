import superagent from 'superagent';
import _ from 'lodash';

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";

export const REQUEST_TRAVELLERS = "REQUEST_TRAVELLERS";
export const RECEIVE_TRAVELLERS = "RECEIVE_TRAVELLERS"

export const REQUEST_PATCH_DESTINATIONS = "REQUEST_PATCH_DESTINATIONS";
export const RECEIVE_PATCH_DESTINATIONS = "RECEIVE_PATCH_DESTINATIONS"

export const LOGOUT = "LOGOUT"

/**
 * requestLogin
 *
 * @public
 * @param username
 * @return {Object}
 */
function requestLogin(username) {
  return {
    type: REQUEST_LOGIN,
    username
  }
}

/**
 * receiveLogin
 *
 * @param username
 * @param data
 * @return {Object}
 */
function receiveLogin(data, err) {
  return {
    type: RECEIVE_LOGIN,
    data: data,
    err: err
  }
}

/**
 * _makeid
 *
 * @return {undefined}
 */
function _makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/**
 * callLogin
 *
 * @param username
 * @return {undefined}
 */
function callLogin(username) {
  return dispatch => {
    dispatch(requestLogin(username));
    return superagent
    .post('https://young-beyond-8772.herokuapp.com/auth')
    .type("form")
    .send({name: username})
    .end((err, response) => {
      dispatch(receiveLogin(response.body, err))
    })
  };
}

/**
 * shouldCallLogin
 *
 * @param state
 * @param username
 * @return {undefined}
 */
function shouldCallLogin(state, username) {
  if(!_.get(state, "currentUser.token")) {
    return true;
  }

  return false;
}

/**
 * loginIfNeeded
 *
 * @param username
 * @return {undefined}
 */
export function loginIfNeeded(username) {
  return (dispatch, getState) => {
    if (shouldCallLogin(getState(), username)) {
      return dispatch(callLogin(username));
    }
  };
}

function requestTravellers() {
  return {
    type: REQUEST_TRAVELLERS
  }
}

function receiveTravellers(data, err) {
  return {
    type: RECEIVE_TRAVELLERS,
    data: data,
    err: err
  }
}

export function fetchTravellers(token) {
  return dispatch => {
    dispatch(requestTravellers());
    return superagent
    .get('https://young-beyond-8772.herokuapp.com/travelers')
    .set({Authorization: "Token token=" + token})
    .end((err, response) => {
      var data = response.body;
      data = _.map(data, function(user) {
        user.destinations = _.map(user.destinations, function(des) {
          des._id = _makeid();
          return des;
        })
        return user;
      })
      dispatch(receiveTravellers(data, err))
    })
  };
}


function requestPatchDestinations() {
  return {
    type: REQUEST_PATCH_DESTINATIONS
  }
}

function receivePatchDestinations(data, err) {
  return {
    type: RECEIVE_PATCH_DESTINATIONS,
    data: data,
    err: err
  }
}

export function callPatchDestinations(token, id, destinations) {
  return dispatch => {
    dispatch(requestPatchDestinations());
    return superagent
    .patch('https://young-beyond-8772.herokuapp.com/travelers/' + id)
    .set({Authorization: "Token token=" + token})
    .send({destinations: destinations})
    .end((err, response) => {
      var data = response.body;
      data.destinations = _.map(data.destinations, function(des) {
        des._id = _makeid();
        return des;
      })
      dispatch(receivePatchDestinations(data, err))
    })
  }
}


export function logout() {
  return {
    type: LOGOUT
  }
}

