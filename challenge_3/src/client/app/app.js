import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 7,
      height: 6,
      player1Turn: true,
      color: 'red'
    }
    this.handleClick = this.handleClick.bind(this);
    this.alternateTurn = this.alternateTurn.bind(this);
  }
  componentDidMount() {
    this.render();
  }
  handleClick(e) {
    if (e.target.className === 'white') {
      if (this.state.player1Turn) {  
        e.target.className = this.state.color;
        this.alternateTurn('blue');
      } else {
        e.target.className = this.state.color;
        this.alternateTurn('red');
      }
    }
  }

  alternateTurn(col) {
    this.setState({
      player1Turn: !this.state.player1Turn,
      color: col
    })
  }
  sendPost() {
    
  }
  render() {
    let numRows = [...Array(this.state.height).keys()];
    let rowCounter = 0;
    return (
      <section className="board">
        <h1 className="title">Connect-Four (on a budget)</h1>
        {
          numRows.map(() => {
            rowCounter++;
            return  <Row handleClick={this.handleClick}
                          width={this.state.width}
                          className={'row ' + (rowCounter-1)}
                    />

          })
        }
      </section>
    );
  }
}


/************************************/

// ROW component

/***********************************/


const Row = (props) => {
  let width = [...Array(props.width).keys()];
  let colCounter = 0
  return(
    <div className={props.className}>
      {
        width.map( num => {
          colCounter++;
          return <Cell handleClick={props.handleClick}
                        className={'white ' + (colCounter-1)}
                  />
        })
      }
    </div>
  );
}


/************************************/

// CELL component

/***********************************/


const Cell = (props) => {
  return(
    <div className="cell">
      <div className={props.className}
            onClick={(e) => {props.handleClick(e)}}
      >
      </div>
    </div>
  );
}

export default App;

