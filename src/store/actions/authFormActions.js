import {
  LOGIN_SUCCESS,
  LOGIN_EXIT
} from '../actionTypes/actionTypes';



export function loginSuccess(){
  return {type: LOGIN_SUCCESS}
}


export function logoutHandler(){
  return {type: LOGIN_EXIT}
}