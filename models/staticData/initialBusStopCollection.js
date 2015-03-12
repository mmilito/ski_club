// Initial population of bus stop collections
// initial population. TIMES may be updated
var BusStop = require('./busStop');

var errHandler2 = function(err,document){
	if (err) {console.log(err);}
};

if (BusStop.find({})<1){
	var parker = new BusStop({
			zone:'SouthEast',
			stopName:'Parker',
			departDen:'5:45 AM',
			arriveDen:'6:00 PM',
			description:'Parker, East Parker and Main Hobby Lobby parking lot, 10901 S Parker Rd'
	});
	parker.save(errHandler2);
}

