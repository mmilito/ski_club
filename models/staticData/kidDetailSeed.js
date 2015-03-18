// Initial population of kid detail  collections
// seed data for testing only !!!!
var KidDetail = require('../kidDetail');

var errHandler3 = function(err,document){
	if (err) {console.log(err);}
};

// some data for testing purposes
if (KidDetail.find({})<1){
	var kidSeed1 = new KidDetail({
		name:{
			first: 'Emma',
			last: 'Milito'
		},
		dob: '7/31/2003',
		address: {
			street:'7324 S Dexter Way',
			city: 'Centennial',
			state: 'CO',
			zip: '80122',
			type: 'main'
		},
		phone: {
			mainCell: '970-531-3341',
			emergCell: '720-441-7484',
		},
		email: {
			mainEmail: 'mdmilito@yahoo.com',
			auxEmail: 'davemilito@yahoo.com'
		},
		medical: 'none',
		busStop: 'SouthGlenn',
		skiLevel: 'maroon',
		active: true
	});
	kidSeed1.save(errHandler3);

// fake kid data #2
	var kidSeed2 = new KidDetail({
		name:{
			first: 'Test',
			last: 'Kid2'
		},
		dob: '1/20/1999',
		address: {
			street:'7324 S Dexter Way',
			city: 'Centennial',
			state: 'CO',
			zip: '80122',
			type: 'main'
		},
		phone: {
			mainCell: '970-531-3341',
			emergCell: '720-441-7484',
		},
		email: {
			mainEmail: 'testkid2@fake.com',
		},
		medical: 'asthma and psoriasis',
		busStop: 'Parker',
		skiLevel: 'yellow',
		sbLevel: 'low-green',
		active: true
	});
	kidSeed2.save(errHandler3);

// fake kid data #3
	var kidSeed3 = new KidDetail({
		name:{
			first: 'Newkid',
			last: 'Ondablock'
		},
		dob: '10/2/2006',
		address: {
			street:'7324 S Dexter Way',
			city: 'Centennial',
			state: 'CO',
			zip: '80122',
			type: 'main'
		},
		phone: {
			mainCell: '970-531-3341',
			emergCell: '720-441-7484',
		},
		email: {
			mainEmail: 'testkid3@fake.com',
		},
		medical: 'none',
		busStop: 'Hampden & Happy Canyon',
		sbLevel: 'high-orange',
		active: true
	});
	kidSeed3.save(errHandler3);
}



