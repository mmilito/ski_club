// *** SERVER SIDE CODE ***  STATIC PREPOPULATED DATA
// detail of Eskimo ski and sb levels for all ages
var mongoose = require('mongoose');

var levelListSchema = mongoose.Schema({
	discipline: String,
	ageAppliesTo: String,
	color: String
});

module.exports = mongoose.model('LevelList', levelListSchema);

