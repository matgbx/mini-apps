import React from 'react';

const ScoreBox = (props) => {
  console.log('scoreBox spare: ',props.bowl2);
  return (
    <div className="scoreBox">
      <div className="bowl2">{props.bowl2}</div>
      <div className="bowl1">{props.bowl1}</div>
      {props.bowl1 + props.bowl2 || 0}
    </div>
  )
}

export default ScoreBox;