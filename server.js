var express = require('express'); // sudo npm install express -g
var app = express();

app.use(express.static('final'))

app.listen(8080);