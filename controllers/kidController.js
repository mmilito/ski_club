// SERVER SIDE JAVASCRIPT

var KidDetail = require('../models/kidDetail');


var kidController = {

	// get all data for all kids
	getAll: function(req,res){
		KidDetail.find(({}),function(err,results){
			if (err){console.log(err);}
			//console.log('sorted',results.sort({"results.skiLevel":-1}));
			//console.log('results names', results.map(function (r) { return r.name.full }));
			//results.sort('name.last',1);
			//console.log('orig',results);
			res.send(results);
		});
	},

	// getSorted: function(req,res){
	// 	KidDetail.find({}).sort({skiLevel:1}),function(err,results){
	// 		console.log(results);
	// 		res.send(results);
	// 	};
	// },

	// creates new record from data sent from form
	createNewKid: function(req,res){
		var newKid = new KidDetail(req.body);
		newKid.save(function(err,results){
			if (err) {console.log(err);}
			res.send(results);
		});
	},

	// deletes or updates existing kid 
	deleteUpdateKid: function(req,res){
		var UpdateOrDelete = req.body.method;  // method=flag
		// if the flag is TRUE (exists on record), then delete the record
		if(UpdateOrDelete){
			var kidToDelete=KidDetail.findById(req.body.id);
			KidDetail.remove(kidToDelete, function(err,results){
			 	if (err){console.log(err);}
				res.send(results);
			});
		// if the flag is not there, update the record
		} else {
			// in order to have variable passed to db for update must be object
			var dbObj={};
			dbObj[req.body.fieldname]=req.body.newValue;
			var id=req.body.id;
			KidDetail.findByIdAndUpdate(id, dbObj,function(err,results) {
			 	if (err) {console.log(err);}
			 	res.send(results);
			});
		}
	},

		// color level data
	getLevels: function(req,res){
		console.log('getLevels22');
		KidDetail.find({category:"old"},function(err,results){
			if (err){console.log(err);}
			console.log(results);
			res.send(results);
		});
	}

}; // end kidController

module.exports=kidController;