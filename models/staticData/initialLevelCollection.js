// Initial population of static collections
// see below arrays for static data logic
var LevelList = require('./levelList');

// levels for skiers 10 and under
var skiTen=[
	'green10',
	'yellow10',
	'blue10',
	'half-red10',
	'red10',
	'half-maroon10',
	'maroon10',
	'half-white10',
	'white10',
	'low-black10',
	'top-black10',
	'TBC'
	];

// levels for skiers older than 10
var skiOld=[
	'green',
	'yellow',
	'blue',
	'half-red',
	'red',
	'half-maroon',
	'maroon',
	'half-white',
	'white',
	'low-black',
	'top-black',
	'TBC'
	];

// levels for snowboarders 10 and under
var sbTen=[
	'new-green10',
	'high-green10',
	'low-silver10',
	'high-silver10',
	'low-orange10',
	'high-orange10',
	'low-pink10',
	'high-pink10',
	'low-purple10',
	'high-purple10',
	'RBC'
	];

// levels for snowboarders older than 10
var sbOld=[
	'new-green',
	'high-green',
	'low-silver',
	'high-silver',
	'low-orange',
	'high-orange',
	'low-pink',
	'high-pink',
	'low-purple',
	'high-purple',
	'RBC'
	];

var errHandler = function(err,document){
	if (err) {console.log(err);}
};

//console.log(LevelList);
// populate SKI TEN listLevel
var popSkiLevelTen=function(array){
	for (var i=0;i<array.length;i++){
		var newLevelList = new LevelList({
			discipline:"ski",
			ageAppliesTo:"ten",
			color: array[i]
		});
		newLevelList.save(errHandler);
	}
};

//console.log(popSkiLevelTen(skiTen));

// populate SKI OLD listLevel
var popSkiLevelOld=function(array){
	for (var i=0;i<array.length;i++){
		var newLevelList = new LevelList({
			discipline:"ski",
			ageAppliesTo:"old",
			color: array[i]
		});
		newLevelList.save(errHandler);
	}
};

// populate SB TEN listLevel
var popSbLevelTen=function(array){
	for (var i=0;i<array.length;i++){
		var newLevelList = new LevelList({
			discipline:"sb",
			ageAppliesTo:"ten",
			color: array[i]
		});
		newLevelList.save(errHandler);
	}
};

// populate SB OLD listLevel
var popSbLevelOld=function(array){
	for (var i=0;i<array.length;i++){
		var newLevelList = new LevelList({
			discipline:"sb",
			ageAppliesTo:"old",
			color: array[i]
		});
		newLevelList.save(errHandler);
	}
};

LevelList.find({},function(err,documents){
	if(documents.length<1){
		popSkiLevelTen(skiTen);
		popSkiLevelOld(skiOld);
		popSbLevelTen(sbTen);
		popSbLevelOld(sbOld);
		}
});

