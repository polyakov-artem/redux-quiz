import React, { Component } from 'react';
import Layout from './Container/Layout/Layout';
import QuizPage from './Components/QuizPage/QuizPage'
import AuthPage from './Container/AuthPage/AuthPage'
import CreatingPage from './Components/CreatingPage/CreatingPage'
import QuizListPage from './Container/QuizListPage/QuizListPage'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class App extends Component {

  render() {
    const {authorized} = this.props;
    return (
      <div className="App">
        <Layout >
          <Switch>
            <Route path='/redux-quiz/auth' render={()=>(
              authorized
                ? <Redirect to="/redux-quiz"/>
                : <AuthPage/>
            )}/>
            <Route path='/redux-quiz/quiz-creator' component={CreatingPage}/>
            <Route path='/redux-quiz/:id' component={QuizPage}/>
            <Route path='/redux-quiz' exact component={QuizListPage}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps({authFormState}){
  return{
    authorized: authFormState.authorized
  }
}

export default connect(mapStateToProps, null)(App);


