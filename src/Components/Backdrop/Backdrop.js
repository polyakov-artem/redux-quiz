import React from 'react'
import './Backdrop.css';


export default props => {
  return (
      <div className = 'backdrop' onClick = {props.onClick}> </div>
    )
}