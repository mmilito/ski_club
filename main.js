// main.js for ski club app

// constructor for ski holds ski level and date changed
var Ski=function(level){
	var skiArgs={
			level:level || 'NA',
			updateDate:Date()
	};
	return skiArgs;
};

// constructor for snowboarding holds sb level and date changed
var Snowboard=function(level){
	var sbArgs={
			level:level || 'NA' ,
			updateDate:Date()
	};
	return sbArgs;
};

// constructor for single kid object
var Kid=function(firstName,lastName,skiLevel,sbLevel,dob){
	this.firstName=firstName;
	this.lastName=lastName;
	this.idNum=_.uniqueId('eskimo_');
	this.skiLevel=new Ski(skiLevel);
	this.sbLevel=new Snowboard(sbLevel);
	this.dob=dob;
};

// page layout method for single kid
// reflects kid data from db on screen
Kid.prototype.renderKid=function(){
	this.$el=$('.row').clone().attr('id',this.idNum);
	this.$el.addClass('not_a_template').removeClass('row template');
	this.$el.find('[name="firstName"]').attr('placeholder', this.firstName);
	this.$el.find('[name="lastName"]').attr('placeholder', this.lastName);
	this.$el.find('[name="skiLevel"]').children('[value='+this.skiLevel.level+']').attr('selected','selected');  //sets default closed value on SKI dropdown
	this.$el.find('[name="sbLevel"]').children('[value='+this.sbLevel.level+']').attr('selected','selected');  //sets default closed value on SB dropdown
	this.$el.find('[name="dob"]').attr('placeholder', this.dob);
	$('.kid_container').append(this.$el);
};

// add single kid through form
var addKid=function(){
		var tempKid = new Kid('new','new','new','new','new');
		tempKid.renderKid();
};

// constructor for collection of kids
var MainKidList=function(kidArray){
	this.kidArray=kidArray;
};

//this loops through kid list array and calls Kid.prototype.render
// this.kidArray does not seem to be available
MainKidList.prototype.render=function(){
	 for(var i=0;i<this.kidArray.length;i++){
	 	this.kidArray[i].renderKid();
	 }
};

//instantiate for testing
var joeSmith=new Kid('Joe','Smith','half-red','','9/1/2001');
var janeSmith=new Kid('Jane','Smith','blue','low-orange','7/12/1997');
var samJones=new Kid('Sam','Jones','','','2/4/2005');
var pinkiePinkerton=new Kid('Pinkie','Pinkerton','','low-silver','6/22/2000');
var louieWilkse=new Kid('Louie','Wilkse','','high-silver','10/15/1995');
var emmaMilito=new Kid('Emma','Milito','maroon','','7/31/2003');

// create array to mimic db
var eskimoKids=new MainKidList([joeSmith,janeSmith,samJones,pinkiePinkerton,louieWilkse,emmaMilito]);


$(document).on('ready', function() {
	eskimoKids.render();  // adds existing kids to screen for review/editing
	$('.btn').on('click',function(){
		addKid();
	});
	// save inputs to db -- no need now, since not hooked to db
			// $('.form-control').on('blur',function(){
			// 	var tempThis=$(this);
			// 	console.log(tempThis.val());
			// });

});