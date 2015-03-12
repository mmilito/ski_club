// *** SERVER SIDE CODE ***
// detail of Eskimo kids
var mongoose = require('mongoose');

var kidSchema = mongoose.Schema({
	name:{
		first: String,
		last: String
	},
	dob: Date,
	address: {
		street: String,
		city: String,
		state: String,
		zip: String,
		type: {type: String, default: 'main'}
	},
	phone: {
		mainCell: String,
		emergCell: String,
	},
	email: {
		mainEmail: String,
		auxEmail: String
	},
	medical: String,
	busStop: String,
	skiLevel: String,
	sbLevel: String,
	active: Boolean
});

var MILLISECONDS_IN_A_YEAR = 31536000000;
kidSchema.virtual('age')
	.get(function(){
		return Math.floor((new Date()-this.dob)/MILLISECONDS_IN_A_YEAR);
	});
kidSchema.virtual('name.full')
	.get(function(){
		return this.name.first+" "+this.name.last;
	});

kidSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('KidDetail',kidSchema);
