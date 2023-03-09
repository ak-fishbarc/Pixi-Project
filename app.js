const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const cors = require('cors')
const express = require('express')
const app = express()


app.use(cors());
app.options('*', cors());

app.get('/', cors(), (req, res, next) => {
  res.sendFile('pixi.html', { root: path.join(__dirname, './')});
});

app.use(express.static('sprites'));
app.use(express.static('./'));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
