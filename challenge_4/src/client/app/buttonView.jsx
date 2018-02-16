import React from 'react';
import Button from './button'

const ButtonView = (props) => {

  let numsArr = [...Array(11).keys()].slice(1);
  
  return (
    <div className="btnView">
    {
      numsArr.map((num) => {
        return <Button 
                number={num}
                scoreClickHandler={props.scoreClickHandler}  
                />
      })
    }
    </div>
  )
}

export default ButtonView;
// onClick={() => props.scoreClickHandler()}