import axios from '../../axios/axios';

import {
  QUIZ_LOADING_START,
  QUIZ_LOADING_END,
  QUIZ_SUCCESS,
  QUIZ_ERROR,
  RESET_QUIZ,
  SET_ANSWER,
  FINISH_QUIZ,
  NEXT_QUESTION,
  SET_CURRENT_QUIZ_ID
} from '../actionTypes/actionTypes';


export function getQuiz(id){
  return async function(dispatch, getState){
    const quizState = getState().quizesState.quizes[id];

    dispatch(startQuizLoading());
    if (!(quizState && quizState.quiz && quizState.quiz.length)){
      try{
        const response = await axios.get('/quizes/'+id+'.json');
        dispatch(quizSuccess(response.data));
      } catch (e){
        dispatch(quizError(e))
      }
    } 
    dispatch(endQuizLoading());
  }
}

export function setCurrentQuizId(id){
  return {
    type: SET_CURRENT_QUIZ_ID, id 
  }
}

export function startQuizLoading(){
  return {
    type: QUIZ_LOADING_START
  }
}

export function endQuizLoading(){
  return {
    type: QUIZ_LOADING_END
  }
}


export function quizSuccess(quiz){
  return {
    type: QUIZ_SUCCESS,
    quiz,
  }
}

export function quizError(e){
  return {
    type: QUIZ_ERROR,
    error: e,
  }
}

export function resetQuiz(){
  return {
    type: RESET_QUIZ
  }
}

export function chooseHandler(chosenAnswerId){
  return async function(dispatch, getState){

    const {currentQuizId, quizes} = getState().quizesState;
    const {quiz, numberOfQuestion, answersArray} = quizes[currentQuizId];

    if( answersArray[numberOfQuestion] ) {
      dispatch({type: 'default'});
      return
    };

    if (quiz[numberOfQuestion].rightAnswerId === chosenAnswerId) {
        dispatch(setAnswer({state:'correct', chosenAnswerId}))
    } else{
        dispatch(setAnswer({state:'incorrect', chosenAnswerId}))
    };

    setTimeout( 
      ()=>{ 
        if (numberOfQuestion +1 !== quiz.length) {
          dispatch(nextQuiestion())
        } else 
          dispatch(finishQuiz())
      }, 500)
  }
}

export function setAnswer(answer){
  return {
    type: SET_ANSWER,
    answer
  }
}

export function finishQuiz(){
  return {
    type: FINISH_QUIZ
  }
}

export function nextQuiestion(){
  return {
    type: NEXT_QUESTION,
  }
}



