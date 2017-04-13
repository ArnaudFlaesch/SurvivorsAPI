var express    = require('express');
var server     = express();
var bodyParser = require('body-parser');

var router = express.Router();

var port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Survivors API !' });
});

router.use(function(req, res, next) {
    next();
});

server.use('/', router);

server.listen(port);
console.log('Starting server on port ' + port);