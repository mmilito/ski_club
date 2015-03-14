// SERVER SIDE

var KidDetail = require('../models/kidDetail');

var kidController = {

	// get all data for all kids
	getAll: function(req,res){
		KidDetail.find({},function(err,results){
			if (err){console.log(err)};
			//console.log('results names', results.map(function (r) { return r.name.full }))
			res.send(results);
		});
	},

	// creates new record from data sent from form
	createNewKid: function(req,res){
		var newKid = new KidDetail(req.body);
		newKid.save(function(err,results){
			if (err){console.log(err)};
			res.send(results);
		});
	},

	// deletes or updates existing kid
	deleteUpdateKid: function(req,res){
		var UpdateOrDelete = req.body.method;
		// if the flag is TRUE, then delete the record
		if(UpdateOrDelete){
			var kidToDelete=KidDetail.findById(req.body.id);
			KidDetail.remove(kidToDelete, function(err,results){
			 	if (err){console.log(err)};
				res.send(results);
			});
		// if the flag is FALSE, then update the record
		} else {
			console.log('updateKid',req.body);
		}
	},

	// updates existing records in db


		//console.log(KidDetail.find({id: req.body.id}));
		// KidDetail.update(
		// 	{id: req.id},
		// 	{$set: {  // add schema here

		// 	}});
	//}

}; // end kidController

module.exports=kidController;