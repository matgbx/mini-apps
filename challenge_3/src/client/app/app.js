import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

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
    this.sendPost = this.sendPost.bind(this);
  }
  componentDidMount() {
    this.render();
  }
  handleClick(e) {
    let indexRef = e.target.className.slice(-2);
    let classes =  e.target.className.slice(0, -3);
    if ( classes === 'white open') {
      if (this.state.player1Turn) {  
        e.target.className = this.state.color;
        this.alternateTurn('blue');
      } else {
        e.target.className = this.state.color;
        this.alternateTurn('red');
      }
    }
    this.sendPost(JSON.stringify('WRECKED'))
  }

  alternateTurn(col) {
    this.setState({
      player1Turn: !this.state.player1Turn,
      color: col
    })
  }

  sendPost(message) {
    $.ajax({
      url: 'http://localhost:3000/',
      type: 'POST',
      header: {
        'content-type': 'application/json'
      },
      async: true,
      crossDomain: true,
      data: message,
      success: (data) => {
        console.log('post was sent correctly')
      },
      error: (error) => {
        console.log('error - post did not work', error)
      }
    })
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
                          rowNum={rowCounter-1}
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
  let classes = 'white ';
  if (props.rowNum === 5) {
    classes = 'white open ';
  }
  return(
    <div className={props.className}>
      {
        width.map( num => {
          colCounter++;
          return <Cell handleClick={props.handleClick}
                        className={classes + (props.rowNum) + '' + (colCounter-1)}
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

