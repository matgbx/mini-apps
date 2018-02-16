import React from 'react';
import ScoreBox from './scoreBox'

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bowlsPerRd: [[0,0],[0,0],[0,0],[0,0],[0,0],
                  [0,0],[0,0],[0,0],[0,0],[0,0],],
      roundScores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      frames: this.props.frames,
      lastFrame: 0

    }
  }
  componentDidMount() {
    this.render();
  }
  setLastFrame() {
    this.setState({
      lastFrame: this.props.currFrame
    })
  }

  setFrameScores() {
    let count = this.props.bowlCount;
    let score = this.props.bowlScore;
    let frame = this.props.currFrame;
    let workingFrame = this.state.bowlsPerRd[frame-1]
    if (frame >= 1 && frame !== this.state.lastFrame) {
      if (count % 2 === 1) {
          workingFrame[0] = score;  
      } else {
        workingFrame[1] = score; 
        this.setLastFrame(); 
      }
      
    }
  }

  // strikesAndSpares() {
  //   let frames = this.state.bowlsPerRd
  //   for (var i = 0; i < frames.length) {
  //     let bowl1 = frames[i][0];
  //     let bowl2 = frames[i][1];
  //     //check for strike
  //     if (bowl1 + bowl2 === 10 && bowl1 !== 0 && bowl2 !== 0) {
  //       // collect next two bowls and add to value

  //       //then check for spare
  //     } else if (bowl1 + bowl2 === 10) {
  //       // collect next bowl and add to value
  //     } else {
  //       this.state.roundScores[i] === bowl1 + bowl2;
  //     }
  //   }
    
  // }

  render() {
    this.setFrameScores();
    return (
      <div className="scoreBoard">
      {
        this.state.frames.map(num => {
          let frame = this.state.bowlsPerRd[num-1];
          if (frame.length > 0) {
            if (this.props.strike){
              console.log('strike? SB: ', this.props.strike)
              return <ScoreBox bowl1={'X'} bowl2={''}/>  
            } else if (this.props.spare) {
              console.log('spare? SB: ', this.props.spare)
              return <ScoreBox bowl1={frame[0]} bowl2={'/'}/>  
            } else {
              return <ScoreBox bowl1={frame[0]} bowl2={frame[1] || ''}/>
            }
          }
            
        }) 
      }
      </div>
    )
  }
}
export default ScoreBoard;


