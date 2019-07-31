import React from 'react';
import './AuthPage.scss';
import AuthForm from '../../Components/AuthForm/AuthForm'


class AuthPage extends React.Component {

  render() {
    return (
      <div className='auth-page'>
        <h1 className='auth-page__title'>Авторизация</h1>
        <AuthForm/>
      </div>
    )
  }
}

export default AuthPage;