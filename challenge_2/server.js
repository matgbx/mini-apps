// Express and server connection etc

//assuming that we are using MySql??

const express = require('express');

const app = express();
app.use(express.static('./client'));

app.get('/', express.static('/client')); // not sure what to do with the get?

app.listen(3000, () => console.log('listening on port 3000'))


const func = (body) => {
  body = JSON.parse(body);
  let result = [];

  const traverseData = (person) => {
    if (result.length === 0) {
      // get each column's title by creating an array of the objects keys
      let colTitles = Object.keys(person);
      // remove the children key from the end of the array
      colTitles.pop();
      // add as first subArr to result
      result.push(colTitles);
    }
    // set variable 'attributes' which will hold each person's details in an array
    let attributes = [];
    // loop through the array of column titles - found at position 0 of results array
    for (let i = 0; i < result[0].length; i++) {
      // push each attribute into the attributes array
      attributes.push(person[result[0][i]]);
    }
    // once all attributes have been added, push the attributes array into result
    result.push(attributes);
    // then check if the person has children
    if (person.children.length > 0) {
      //loop through children array and call the traverseData function on each child/person
      for (let j = 0; j < person.children.length; j++) {
        traverseData(person.children[j]);
      }
    }
  }
  // invoke the inner recursive function aka traversData
  traverseData(body);
  return result;
}

const csvFormatter = (array) => {
  let newArr = [];
  for (var i = 0; i < array.length; i++) {
    newArr.push(array[i].join(','));
  }
  return newArr;
}

const postHandler = (req, res) => {
  console.log('req received');
  body = [];
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    body = func(body);
    csvFile = csvFormatter(body);
    res.send(csvFile);
  })
}

app.post('/', postHandler);