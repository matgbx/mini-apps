const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../client/app'));
app.use(express.static(__dirname + '/../client/public'));
// app.get('/', (req, res) => {
//   res.send();
// })
app.post('/', (req, res) => {
  postHandler(req, res);
})

app.listen(3000, (req, res)=> {
  console.log('listening on port 3000')
});


/***************************/

const gameBoard = () => {
  let board = [];
  for (let i = 0; i < 6; i++) {
    board.push([0, 0, 0, 0, 0, 0, 0])
  }
  return board;
}

let currBoard = gameBoard();

/***************************/

//these functions assume that an object is sent to the server in the following format:
 // {
 //  index: '50',
 //  player: 'red'
 // }

const postHandler = (req, res) => {
  console.log('post req received');
  body = [];
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    setBoard(JSON.parse(body), (currBoard) => {
      res.send(currBoard);
    });
    
  })
}

const setBoard = (obj, callback) => {
  let rowIndex = Number(obj.index.slice(0, -1)); 
  let colIndex = Number(obj.index.slice(1));
  player1Move = 1;
  player2Move = -1;
  currBoard[rowIndex][colIndex] = obj.player === 'red' ? player1Move : player2Move;
  callback(currBoard);
}


const comboChecker = {
  checkHoriz: (board) => {
    count = 0;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        count += board[i][j];
      }
      if (count >= 4) {
        return 'red wins!'
      } else if (count <= -2) {
        return 'blue wins!'
      }
    }
  },
  checkVert: (board) => {
    count = 0;
    col = 0;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length-1; j++) {
        count += board[j][col]
      }
      col++;
      if (count >= 4) {
        return 'red wins!'
      } else if (count <= -2) {
        return 'blue wins!'
      }
    }
  },
  checkDiag: (board) => {

  }

}



// const

