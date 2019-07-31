import React, {Component} from 'react'
import QuizItem from '../../Components/QuizItem/QuizItem'
import QuizResults from '../../Components/QuizResults/QuizResults'
import Loader from '../../Components/Loader/Loader'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getQuiz, resetQuiz, chooseHandler, setCurrentQuizId} from '../../store/actions/quizActions'

import './Quiz.scss';

class Quiz extends Component{

  componentDidMount(){
    const id = this.props.match.params.id;
    const {setCurrentQuizId, getQuiz} = this.props;

    setCurrentQuizId(id);
    getQuiz(id);
  }

  navigateToList = ()=>{
    this.props.history.push({
      pathname: '/redux-quiz'
    });
  }

  render(){
    const {loading, quizesState, currentQuizId, error, resetQuiz, chooseHandler} = this.props;
    const quizState = quizesState.quizes[currentQuizId];

    return(
      <div className ='quiz'>
        { error 
          ? <p>Произошла ошибка во время загрузки</p>
          : (loading)
            ? <Loader classes='quiz' />
            : (quizState.isFinished)
              ? <QuizResults 
                  navigateToList = {this.navigateToList}
                  answersArray = {quizState.answersArray}
                  quizState = {quizState}
                  retryHandler = {resetQuiz} />
              : <QuizItem
                  quizState = {quizState}
                  chooseHandler = {chooseHandler}
                />
        }
      </div>
    )
  }
}


function mapStateToProps({quizesState}){
  return {
    quizesState: quizesState,
    loading: quizesState.loading,
    error: quizesState.error,
    currentQuizId: quizesState.currentQuizId
  }
}

const mapDispatchToProps = {
  getQuiz: getQuiz,
  resetQuiz: resetQuiz,
  chooseHandler: chooseHandler,
  setCurrentQuizId: setCurrentQuizId
}


export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz))