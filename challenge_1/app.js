document.addEventListener("DOMContentLoaded", function(event) { 
  

  // function that adds onclick event listeners to each child of the row element
  // the onclick event listeners will invoke a function that appends X or 0 element to that square
 
  // console.log(squares.length);
	let count = 0;
	let token = 'X';
	let board = [[0,0,0],[0,0,0],[0,0,0]];

	const indexKeys = {
		'zero': 0,
		'one': 1,
		'two': 2
 	}



 	 // get all elements that have the class '.row'
  const rows = document.querySelectorAll('.row');
  // for each child node with the class of 'square'
 	[].map.call(rows, (child) => {
  	//add an event listener for all click events
  	child.addEventListener('click', (child) => {
  		// assign the display token function to this event 
  		displayToken(child);
  	}, false);
  });


  document.getElementById('refreshBtn').onclick = ()=> {
  	refreshGrid();
  }

  //***************************// 

  // displayToken
  
	// displays X or O, and adds value to the board array //


//***************************// 

 	

    const displayToken = (node) => {
		// check if the square is empty e.g. no child nodes appended
		if (node.path[0].childNodes.length === 0) {
			// check if count if is even, reassign the token to either 'X' or 'O' accordingly
			if (count % 2 === 0) {
				token = 'X';
			} else {
				token = 'O';
			}
			// append a child node/div element with the appropriate token (X or 0);  			
			node.path[0].innerHTML = '<div class="' + token + '">' + token + '</div>';
			count++;
			
			// retrieve the square index and row index from the class of the selected square and it's parent row
			let squareIndex = node.path[0].getAttribute('class').split(' ').slice(1);
			let rowIndex = node.path[1].getAttribute('class').split(' ').slice(1);
			// convert index into number e.g. 'one' to 1;
			squareIndex = indexKeys[squareIndex[0]];
			rowIndex = indexKeys[rowIndex[0]];

			// assign the token value to the appropriate possition on the board
			board[rowIndex][squareIndex] = token === 'X' ? 1 : -1;
			// increment the count variable
			// console.log(board);
			
		}
		//loop through combinationChecker object to see if there are any winning combinations
		for (let key in comboChecker) {
			let result = comboChecker[key](board);
			if (result) {
				console.log(result);
				return result;
			} else if (count === 9) {
				console.log(result);
				console.log('DRAW!');
				return 'DRAW!!';
			}
		}
  	// make a call to the function that checks for a winner
  }
 
//***************************// 


	// REFRESH BUTTON //

//***************************// 
 
 

  //create button click that refreshes the grid
  const refreshGrid = () => {
	  let squares = document.querySelectorAll('.square');
	  // for each child node with the class of 'square'
	  [].map.call(squares, (child) => {
	  	//add an event listener for all click events
	  	child.innerHTML = '';
	  	count = 0;
	  	board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	  	// console.log(child);
	  });
  }


//*********************************// 


	// Row, Col, & Diagonal checker //

//********************************// 


  const comboChecker = {
  	checkRows: (board) => {
	  	for (let i = 0; i < board.length; i++) {
	  		let val = 0;
	  		for (let j = 0; j < board[i].length; j++) {
	  			val += board[i][j];
	  		}
	  		if (val === 3) {
	  			return 'Player X wins!'
	  		} else if (val === -3) {
	  			return 'Player O wins!'
	  		} 
	  	}
	  },
	  checkCols: (board) => {
	  	let winner = 'no winner yet'
	  	for (let i = 0; i < 3; i++) {
	  		let colVals = board[0][i] + board[1][i] + board[2][i];
	  		if (colVals === 3) {
	  			return 'Player X wins!'
	  		} else if (colVals === -3) {
	  			return 'Player O wins!'
	  		}
	  	}
	  },
	  checkDiags: (board) => {
	  	let leftDiag = board[0][0] + board[1][1] + board[2][2];
	  	let rightDiag = board[0][2] + board[1][1] + board[2][0];
	  	if (leftDiag === 3 || rightDiag === 3) {
  			return 'Player X wins!'
  		} else if (leftDiag === -3 || rightDiag === -3) {
  			return 'Player O wins!'
  		}	
  	}
 	}

});
















