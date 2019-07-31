import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import './SideMenu.scss';
import Button from '../Button/Button';
import { logoutHandler } from '../../store/actions/authFormActions';

const SideMenu = ({closeMenu, authorized, menuIsOpen, logoutHandler})=>{
  
  function renderLinks(){
    const links = [
      {to: '/redux-quiz/', label:'Список тестов', exact: true, id: 1},
    ];

    authorized
      ? links.push({to: '/redux-quiz/quiz-creator', label:'Создать тест', exact: false, id: 3})
      : links.push({to: '/redux-quiz/auth', label:'Авторизация', exact: false, id: 2});

    return links.map((link)=>{
      return (
        <li
          className = 'side-menu__item'
          key = {link.id}>
          <NavLink
            className = 'side-menu__link'
            to={link.to}
            exact = {link.exact}
            onClick = {closeMenu}>
            {link.label}
          </NavLink> 
        </li>
      )
    })
  }

  return(
    <div className = {`side-menu ${menuIsOpen? '': 'side-menu_is_closed'}`}>
      <nav>
        <ul className = 'side-menu__list'>
          {renderLinks()}
        </ul>
      </nav>
      <Button 
        theme ='info'
        onClick={logoutHandler}>
        Выйти
      </Button>
    </div>
  )
}


function mapStateToProps({authFormState}){
  return{
    authorized: authFormState.authorized
  }
}

const mapDispatchToProps ={
  logoutHandler: logoutHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);