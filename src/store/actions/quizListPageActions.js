import axios from '../../axios/axios';
import {
  QUIZ_LIST_LOADING_STARTED,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_ERROR,
} from '../actionTypes/actionTypes';

export function getQuizList(){
  return async function(dispatch){
    dispatch(quizListLoadingStarted());
    try{
      const response = await axios.get('/quizes.json');

      const quizes = Object.keys(response.data).map( (quizKey, index) => {
          return {id: quizKey, name: `Тест №${index+1}`}
      });

      dispatch(quizListSuccess(quizes))
    } catch (e){
      dispatch(quizListError(e))
    }
  }
}

export function quizListLoadingStarted(){
  return {
    type: QUIZ_LIST_LOADING_STARTED
  }
}


export function quizListSuccess(quizes){
  return {
    type: QUIZ_LIST_SUCCESS,
    quizes
  }
}

export function quizListError(e){
  return {
    type: QUIZ_LIST_ERROR,
    error: e
  }
}