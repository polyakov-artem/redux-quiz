import React from 'react';
import './CreatingPage.scss';
import CreatingForm from '../../Container/CreatingForm/CreatingForm'

class CreatingPage extends React.Component {
  render() {
    return (
      <div className='creating-page'>
        <h1 className='creating-page__title'>Создание теста</h1>
        <CreatingForm />
      </div>
    );
  }
}

export default CreatingPage;