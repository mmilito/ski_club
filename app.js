// Eskimo app

// package requirements
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// db connection
mongoose.connect('mongodb://localhost/skiClub');

// verify database
require('./models/staticData/initialBusStopCollection');
require('./models/staticData/initialLevelCollection');
require('./models/staticData/kidDetailSeed');


// mware controllers
var indexController = require('./controllers/index');
var kidController = require('./controllers/kidController');
//var levelController = require('./controllers/levelController');



var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes, glorious routes
app.get('/', indexController.index);
app.get('/templates/:templateId', indexController.getTemplate);

app.get('/routePlaceholder', kidController.getAll);
app.post('/routePlaceholder', kidController.createNewKid);
app.put('/routePlaceholder', kidController.deleteUpdateKid);
app.get('/routePlaceholder', kidController.getLevels);
app.get('/routeToLevels', kidController.getLevels2);
app.get('/routePlaceholder', kidController.changeLevels);



var server = app.listen(9945, function() {
	console.log('Express server listening on port ' + server.address().port);
});
