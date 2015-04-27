var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
var index = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8');

app.use('/assets', express.static('build'));
app.use('/', express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.contentType = 'text/html; charset=utf8';
  res.end(index);
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Express app listening at %s', port);
});
