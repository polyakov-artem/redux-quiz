import {
  QUIZ_LIST_LOADING_STARTED,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_ERROR,
} from '../actionTypes/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null
};

export default function quizListPageReducer(state = initialState, action) {
  switch (action.type) {

    case QUIZ_LIST_LOADING_STARTED:
      return {
        ...state, loading: true
      }

    case QUIZ_LIST_SUCCESS:
      return {
       ...initialState, quizes: action.quizes
      }

    case QUIZ_LIST_ERROR:
      return {
        ...state, loading: false, error: action.error
      }

    default:
      return state
  }
}