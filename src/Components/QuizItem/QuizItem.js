import React from 'react'
import './QuizItem.scss';

const QuizItem = (props) => {
  const {quizState, chooseHandler} = props;
  const {quiz, answersArray, chosenAnswerId, numberOfQuestion} = quizState;
  const currentQuizItem = quiz[numberOfQuestion];
  const answers = currentQuizItem.answers;
  const answerState = answersArray[numberOfQuestion];

  const renderAnswersList=()=>{
    return(
      <ul className = 'quiz-item__answers'>
        {answers.map((answer, index)=>{
          const stateClass = answerState ? `quiz-item__answer_is_${answerState}`: '';
          const classes = `quiz-item__answer ${ chosenAnswerId ===  answer.id? stateClass: ''}`;
          return (
            <li
              className = {classes}
              key = {answer.id}
              answer ={answer}
              onClick = {chooseHandler.bind(this, answer.id)} >
                <span>{index+1}</span>
                {answer.text}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
   <div className = 'quiz-item'>
      <p className = 'quiz-item__question '>
        <span> { currentQuizItem.question} </span>
        <span>{ numberOfQuestion+1} из { quiz.length}</span>
      </p>
      {renderAnswersList()}
    </div>
  )
}

export default QuizItem