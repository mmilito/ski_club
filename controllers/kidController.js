// SERVER SIDE

var KidDetail = require('../models/kidDetail');

var kidController = {

	// get all data for all kids
	getAll: function(req,res){
		KidDetail.find({},function(err,results){
			if (err){console.log(err)};
			console.log('results names', results.map(function (r) { return r.name.full }))
			res.send(results);
		});
	},

	calculateAge: function(req,res){
		KidDetail.find({busStop:"SouthGlenn"},function(err,results){
			console.log('here');
		});
	},

	createNewKid: function(req,res){
		var newKid = new KidDetail(req.body);
		newKid.save(function(err,results){
			if (err){console.log(err)};
			res.send(results);
		});
	}




}; // end kidController

module.exports=kidController;