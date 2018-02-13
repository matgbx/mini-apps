// Express and server connection etc

//assuming that we are using MySql??

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('connected to server'));

// app.use('/class', express.static(__dirname, './client'));

app.listen(3000, () => console.log('listening on port 3000'))

