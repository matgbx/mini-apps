// Express and server connection etc

//assuming that we are using MySql??

const express = require('express');

const app = express();
app.use(express.static('./client'));

app.get('/', express.static('/client')); // not sure what to do with the get?

app.listen(3000, () => console.log('listening on port 3000'))


const func = (body, res) => {
  body = JSON.parse(body);
  colTitles = '';
  result = [];

  const traverseData = (person) => {
    if (result.length === 0) {
      // get each column's title by creating an array of the objects keys
      colTitles = Object.keys(person);
      // remove the children key from the end of the array
      colTitles.pop();
      // add as first subArr to result
      result.push(colTitles);
    }
    // get person col titles minus the children array
    let attributes = [];
    for (let i = 0; i < colTitles.length; i++) {
        attributes.push(person[colTitles[i]]);
    }
    result.push(attributes);
    if (person.children.length > 0) {
      for (let j = 0; j < person.children.length; j++) {
        traverseData(person.children[j]);
      }
    }
  } 
  traverseData(body);
  return result;
}

// const csvFormatter

const postHandler = (req, res) => {
  console.log('req received');
  body = [];
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // res.send(JSON.parse(body));
    body = func(body, res);
    res.send(body);
  })

}

app.post('/', postHandler);