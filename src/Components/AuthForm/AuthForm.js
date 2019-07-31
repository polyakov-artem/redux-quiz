import './AuthForm.scss';
import Button from '../Button/Button'
import Input from '../Input/Input'


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginSuccess } from '../../store/actions/authFormActions';
import axios from 'axios'

const initialState ={
  error: false,
  isFormValid: false,
  inputs: {
    email: {
      id: 1,
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Wrong Email',
      valid: false,
      touched: false,
      validation: {
        required: true,
      }
    },
    password: {
      id: 2,
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Wrong password',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }
}

class AuthForm extends Component {
  state = {...initialState}

  validateControl(value, validation){
    if(!validation) return true;
    let isValid = true;

    if(validation.required){
      isValid = value.trim()!=='' && isValid
    }

    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }
     return isValid
  }

 
  onChangeHandler = (inputName, event) => {
    const inputs = {...this.state.inputs};
    const input = {...inputs[inputName]};
    input.touched = true;

    inputs[inputName] = input;

    input.value = event.target.value;
    input.valid = this.validateControl(input.value, input.validation);

    const isFormValid = Object.keys(inputs).every((key)=> {
      return inputs[key].valid
    });
    
    this.setState({inputs, isFormValid})
  }

  resetForm = () =>{
     this.setState(initialState);
  }



  renderInputs() {
    const inputs = Object.keys(this.state.inputs).map((inputName)=> {
      const input = this.state.inputs[inputName];
      return (
        <Input 
          touched = {input.touched}
          key = {inputName + input.id} 
          value = {input.value}
          type = {input.type}
          label = {input.label}
          htmlFor = {`${inputName}-${input.id}`}
          errorMessage = {input.errorMessage}
          isValid = {input.valid}
          onChange = { this.onChangeHandler.bind(this,inputName) }
        />
      )
    });
    return inputs
  }

  getAuthData = ()=>{
    return {
      email: this.state.inputs.email.value,
      password: this.state.inputs.password.value,
      returnSecureToken: true
    }
  }

  loginHandler = async () =>{
    try{
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCUszkptpA2BUXeBs6J3EBRTJpcx8KdYSc', this.getAuthData())
      if(response.data.registered) this.props.loginSuccess()
    } catch{
      this.processError('loginError')
    }
  }

  registerHandler = async () =>{
    try{
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCUszkptpA2BUXeBs6J3EBRTJpcx8KdYSc', this.getAuthData())
      if(response) return this.props.loginSuccess()
    } catch{
      this.processError('regError')
    }
  }

  processError = (errorType)=>{
    this.setState({error: errorType})
  }

  submitHandler =(event, action)=>{
    event.preventDefault();
    this.resetForm();
  }


  render() {
    const {error} = this.state;
    const errorMessage = 
      (error === 'loginError' && <p className = 'auth-form__message'>Ошибка авторизации!</p>) ||
      (error === 'regError' && <p className = 'auth-form__message'>Ошибка регистрации!</p>);

    return (
      <form action="" onSubmit ={this.submitHandler} className = 'auth-form'>
        {errorMessage}
        { this.renderInputs() }
        <div className = 'auth-form__buttons'>
          <Button
            type='submit'
            disabled={!this.state.isFormValid} 
            onClick={this.loginHandler}
            theme='success'
            classes= 'auth-form__btn'>
            Войти
          </Button>
          <Button
            type='submit'
            disabled={!this.state.isFormValid} 
            onClick={this.registerHandler}
            theme='info'
            classes= 'auth-form__btn'>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps={
  loginSuccess: loginSuccess,
}


export default connect(null, mapDispatchToProps)(AuthForm);