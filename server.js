var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); //__dir and not _dir
var port = process.env.PORT || 80; 
app.listen(port);
console.log('server: ' + port);