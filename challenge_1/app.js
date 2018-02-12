document.addEventListener("DOMContentLoaded", function(event) { 
  

  // function that adds onclick event listeners to each child of the row element
  // the onclick event listeners will invoke a function that appends X or 0 element to that square
 
  // console.log(squares.length);

  const displayToken = (node) => {
  	// user closure to keep last result of this function
  	let count;
  	let lastToken = 'X';
  	// call inner function to do the work/comparison
  	const innerTBC = () => {
  		// check if the square is empty e.g. no child node appended
  		if (node.path[0].childNodes.length === 0) {
  			// append a child node/div element with the appropriate token (X or 0);
  			if (count === undefined) {
  				count = 0;
  			} else {
  				count++;
  			}

  			if (count % 2 === 0) {
  				lastToken = 'X';
  			} else {
  				lastToken = '0';
  			}
  			let childNode = document.createElement('div');
  			// console.log(childNode);
  			node.path[0].innerHTML = '<div class="' + lastToken + '">' + lastToken + '</div>';
  			// node.path[0].append(childNode);
  		}
  	}
  	// invoke inner function
  	innerTBC();
  	// make a call to the function that checks for a win

  }

  // function that displays X
  // function that displays 0
  // how to alternate between turns e.g. if X went last, then 0 next

 console.log('dom loaded');
  const squares = document.querySelectorAll('.row');
  [].map.call(squares, (child) => {
  	child.addEventListener('click', (child) => {
  		displayToken(child);
  	}, false);
  });

});
