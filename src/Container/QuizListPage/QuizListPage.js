import React, { Component } from 'react';
import './QuizListPage.scss';

import {NavLink} from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'

import {getQuizList} from '../../store/actions/quizListPageActions'

import {connect} from 'react-redux'

class QuizListPage extends Component {

  componentDidMount() {
    if(!this.props.quizes.length) this.props.getQuizList()
  }

  renderQuizes(){
    return this.props.quizes.map( (quiz)=>(
      <li className='quiz-list__item' key={quiz.id}>
        <NavLink className='quiz-list__link' to={'/redux-quiz/'+quiz.id}>
          {quiz.name}
        </NavLink>
      </li>
    ))
  }

  render() {
    const list = 
      <ul className= 'quiz-list'>
        { this.renderQuizes() }
      </ul>;
      
    return (
      <div className='quiz-list-page'>
        <h1 className='quiz-list-page__header'>Список тестов</h1>
        {this.props.loading
          ? <Loader className ='quiz-list-page__loader' />
          : this.props.error
            ? <p>Во время загрузки произошла ошибка</p>
            : list
        }
      </div>
    );
  }
}

function mapStateToProps({quizListPageState}) {
  return {
    quizes: quizListPageState.quizes,
    loading: quizListPageState.loading,
    error: quizListPageState.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuizList: () => dispatch(getQuizList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizListPage);