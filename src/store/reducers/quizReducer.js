import {
  QUIZ_LOADING_START,
  QUIZ_LOADING_END,
  QUIZ_SUCCESS,
  QUIZ_ERROR,
  RESET_QUIZ,
  SET_ANSWER,
  FINISH_QUIZ,
  NEXT_QUESTION,
  SET_CURRENT_QUIZ_ID,
} from '../actionTypes/actionTypes';

const initialState = {
  quizes: {},
  currentQuizId: null,
  loading: true,
  error: null
};


const quizInitialState = {
  chosenAnswerId: null,
  numberOfQuestion: 0,
  answersArray: [],
  isFinished: false,
};


export default function quizReducer(state = initialState, action) {

  function getUpdatedQuizes(prop){
    const currentQuizId = state.currentQuizId;
    const quiz = {...state.quizes[currentQuizId], ...prop} ;
    
    return  {...state.quizes, [currentQuizId]: quiz};
  }

  switch (action.type) {

    case SET_CURRENT_QUIZ_ID:
      return {
        ...state, currentQuizId: action.id
      }

    case QUIZ_LOADING_START:
      return {
        ...state, loading: true
      }

    case QUIZ_LOADING_END:
      return {
        ...state, loading: false
      }

    case RESET_QUIZ:
      return {...state, quizes: getUpdatedQuizes(quizInitialState)}

    case QUIZ_SUCCESS:
      return {...state, quizes: getUpdatedQuizes({...quizInitialState,  quiz: action.quiz})} 


    case QUIZ_ERROR:
      return {
        ...state, error: action.error
      }


    case FINISH_QUIZ:
      return {...state, quizes: getUpdatedQuizes({isFinished: true})}

    case NEXT_QUESTION:
      const numberOfQuestion =  state.quizes[state.currentQuizId].numberOfQuestion+1;
      return {...state, quizes: getUpdatedQuizes({numberOfQuestion})} 


    case SET_ANSWER:
      const answersArray= [
        ...state.quizes[state.currentQuizId].answersArray
        , action.answer.state
      ];

      return {...state, quizes: getUpdatedQuizes({answersArray, chosenAnswerId: action.answer.chosenAnswerId})} 

    default:
      return state
  }
}