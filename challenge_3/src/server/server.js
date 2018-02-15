const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../client/app'));
app.use(express.static(__dirname + '/../client/public'));
// app.get('/', (req, res) => {
//   res.send();
// })

app.listen(3000, (req, res)=> {
  console.log('listening on port 3000')
});

