import {
  LOGIN_SUCCESS,
  LOGIN_EXIT
} from '../actionTypes/actionTypes';

const initialState = {
  authorized: false
};

export default function authFormReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        authorized: true,
      }

    case LOGIN_EXIT:
      return initialState

    default:
      return state
  }
}