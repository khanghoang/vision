import { combineReducers } from 'redux';
import {
  REQUEST_LOGIN, RECEIVE_LOGIN,
  REQUEST_TRAVELLERS, RECEIVE_TRAVELLERS,
  REQUEST_PATCH_DESTINATIONS, RECEIVE_PATCH_DESTINATIONS,
  LOGOUT
} from '../actions';

import {cookie} from '../helpers/utils';

function travelers(state = [], action) {
  switch (action.type) {
    case RECEIVE_TRAVELLERS:
      return Object.assign({}, state, {
      isLoading: false,
      data: action.data,
      isErrorFetchingTravelers: action.err
    })
      break;
    case REQUEST_TRAVELLERS:
      return Object.assign({}, state, {
      isLoading: true
    })
    case RECEIVE_PATCH_DESTINATIONS: {
      var data = _.chain(state.data)
      .map(function(user) {
        if(user.id === action.data.id) {
          user.destinations = action.data.destinations;
        }
        return user;
      })
      .value();
      return Object.assign({}, state, {
      isCallPatchingDestination: false,
      isError: action.err
      }, data)
    }
    case REQUEST_PATCH_DESTINATIONS: {
      return Object.assign({}, state, {
      isCallPatchingDestination: true
    })
    }
    break;
    default:
      return state;
  }
}
function currentUser(state = JSON.parse(cookie.get("DATA")), action) {
  switch (action.type) {
    case REQUEST_LOGIN: {
      return Object.assign({}, state, {
        isLoading: true
      });
    }
    case RECEIVE_LOGIN: {

      // if error when loading, show it
      if(action.err) {
        const data = Object.assign({}, state, {
          errorMessage: action.err.toString(),
          isLoading: false
        });
        return data;
      }

      // if success, process to main page
      const data = Object.assign({}, state, action.data, {
        isLoading: false
      });

      // save current user
      cookie.set("DATA", JSON.stringify(data));
      return data;
    }

    case LOGOUT: {
      // erase current user
      let data = null;
      cookie.set("DATA", data);
      return {};
    }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser,
  travelers
});

export default rootReducer;
