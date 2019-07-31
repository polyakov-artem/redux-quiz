import {combineReducers} from 'redux'
import quizListPageReducer from './quizListPageReducer'
import quizReducer from './quizReducer'
import authFormReducer from './authFormReducer'

export default combineReducers({
  quizListPageState: quizListPageReducer,
  quizesState: quizReducer,
  authFormState: authFormReducer,
})