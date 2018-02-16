import React from 'react';

const Button = (props) => {
  return (
    <div 
    className="btn" 
    value={props.number} 
    onClick={(e) =>{props.scoreClickHandler(e)}} 
    >{props.number}</div>
  )
}

export default Button;