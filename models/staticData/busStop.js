// *** SERVER SIDE CODE ***  
// detail of Bus Stops
var mongoose = require('mongoose');

var busStopSchema = mongoose.Schema({
	zone: String,
	stopName: String,
	departDen: String,
	arriveDen: String,
	description: String,
	active: Boolean || true
});

module.exports = mongoose.model('BusStop', busStopSchema);