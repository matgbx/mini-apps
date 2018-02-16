import React from 'react';
import ButtonView from './buttonView'
import ScoreBoard from './scoreBoard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [...Array(11).keys()].slice(1),
      bowlScore: 0,
      bowlCount: 0,
      currFrame: 0,
      strike: false,
      spare: false
    }
    this.scoreClickHandler = this.scoreClickHandler.bind(this);
  }
  componentDidMount() {
    this.render();
  }
  scoreClickHandler(e) {
    let last = this.state.bowlScore;
    let curr = Number(e.target.textContent) || 0;
    let diff = 10 - last;
    if (last + curr > 10) {
      return alert('score amount invalid: please select '+ diff + ' or lower.')
    } else if (curr === 10) {
      console.log('STRIKE ', curr);
      this.setState({
        bowlScore: curr,
        strike: true,
        spare: false,
        bowlCount: this.state.bowlCount+2,
        currFrame: this.state.currFrame+1
      }, () => {this.setFrameAndStrike();})
    } else if (curr + last === 10) {
      console.log('SPARE ', curr);
      this.setState({
        bowlScore: curr,
        strike: false,
        spare: true,
        bowlCount: this.state.bowlCount+1
      }, () => {this.setFrameAndStrike();})
    } else {
      this.setState({
        bowlScore: curr,
        strike: false,
        spare: false,
        bowlCount: this.state.bowlCount+1
      }, () => {this.setFrameAndStrike();})
    }
  }

  setFrameAndStrike() {
    if (this.state.strike || this.state.spare) {
      this.setState({
        strike: false,
        spare: false
      })
    }
    if (this.state.bowlCount % 2 === 1) {this.setState({
        currFrame: this.state.currFrame+1,
      }, () => {console.log('currFrame App: ',this.state.currFrame)})
    } else {
      this.setState({
        bowlScore: 0
      })
    }
  }

  render() {
    return (
      <section className="gameView">
        <div className="title">Bowling</div>
        <ScoreBoard 
        frames={this.state.frames}
        bowlScore={this.state.bowlScore}
        bowlCount={this.state.bowlCount}
        currFrame={this.state.currFrame}
        strike={this.state.strike}
        spare={this.state.spare}
        />
        <ButtonView 
        scoreClickHandler={this.scoreClickHandler}
        />
      </section>
    )
  }
}

export default App;
