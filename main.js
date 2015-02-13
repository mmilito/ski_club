// main.js for ski club app
// ** THERE ARE 31536000000 MILLISECONDS PER YEAR ** (for age calc)


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
var Kid=function(firstName,lastName,dob,skiLevel,sbLevel){
	this.firstName=firstName;
	this.lastName=lastName;
	this.dob=dob;
	this.idNum=_.uniqueId('eskimo_');
	this.skiLevel=new Ski(skiLevel);
	this.sbLevel=new Snowboard(sbLevel);
	this.age=Math.floor((Date.parse(Date())-Date.parse(dob))/31536000000);
};

// page layout method for single kid
// reflects kid data from db on screen
// reflects available classes based on age

Kid.prototype.renderKid=function(){
	
	if (this.age>=11) {

		this.$el=$('.row').clone().attr('id',this.idNum);
		this.$el.addClass('not_a_template').removeClass('row template');
		this.$el.find('[name="firstName"]').attr('placeholder', this.firstName);
		this.$el.find('[name="lastName"]').attr('placeholder', this.lastName);
		//sets default closed value on SKI dropdown
		this.$el.find('[name="skiLevel"]').children('[value='+this.skiLevel.level+']').attr('selected','selected');
		//sets default closed value on SB dropdown
		this.$el.find('[name="sbLevel"]').children('[value='+this.sbLevel.level+']').attr('selected','selected');
		this.$el.find('[name="dob"]').attr('placeholder', this.dob);
		this.$el.find('[name="age"]').attr('placeholder', this.age);
		$('.kid_container').append(this.$el);

	} else {

		this.$el=$('.row10').clone().attr('id',this.idNum);
		this.$el.addClass('not_a_template').removeClass('row10 template');
		this.$el.find('[name="firstName"]').attr('placeholder', this.firstName);
		this.$el.find('[name="lastName"]').attr('placeholder', this.lastName);
		//sets default closed value on SKI dropdown
		this.$el.find('[name="skiLevel10"]').children('[value='+this.skiLevel.level+']').attr('selected','selected');
		//sets default closed value on SB dropdown
		this.$el.find('[name="sbLevel10"]').children('[value='+this.sbLevel.level+']').attr('selected','selected');
		this.$el.find('[name="dob"]').attr('placeholder', this.dob);
		this.$el.find('[name="age"]').attr('placeholder', this.age);
		$('.kid_container').append(this.$el);
	}
};

// PLACEHOLDER just in case at this point
Kid.prototype.unrenderKid=function(){
};

// PLACEHOLDER to move up from below -- add single kid through form
var addKid=function(){
};


// updates age as dob changes
var updateKidAge=function(elem){
 	var newDob=elem.val();
	var recalcAge=Math.floor((Date.parse(Date())-Date.parse(newDob))/31536000000);
	elem.parent().siblings().children('[name="dob"]').attr('placeholder', newDob);
	elem.parent().siblings().children('[name="age"]').attr('placeholder', recalcAge);
	//elem.parent().siblings().children('[name="firstName"]').attr('placeholder', val());
};

var updatePickList=function(elem){
	var elevenYears=31536000000*11;
	var origAgeinMS=(Date.parse(Date())-Date.parse(elem.attr('placeholder')));
	var newAgeinMS=(Date.parse(Date())-Date.parse(elem.val()));
	//console.log(31536000000*8);
	//console.log(Math.floor(Date.parse(elem.attr('placeholder'))));
	if (newAgeinMS>=elevenYears && origAgeinMS<elevenYears){
		console.log("here");
	}

};

// constructor for collection of kids
var MainKidList=function(kidArray){
	this.kidArray=kidArray;
};

// loops through kid list array and calls Kid.prototype.render
MainKidList.prototype.render=function(){
	//var alphaSort=_.sortBy(_.sortBy(eskimoKids.kidArray, "firstName"),"lastName");
	for(var i=0;i<this.kidArray.length;i++){
	 	this.kidArray[i].renderKid();
	}
};

// blows away previously rendered page to prepare for sorting
MainKidList.prototype.unrender=function(elem){
	elem.parents().siblings('.kid_container').children('.not_a_template').remove();
};

var alphaSort=function(elem){
	var alphaSort1=_.sortBy
					(_.sortBy(eskimoKids.kidArray, "firstName"),"lastName");
	alphaSort1=new MainKidList(alphaSort1);
	alphaSort1.unrender(elem);
	alphaSort1.render();
};

var ageSort=function(elem){
	var ageSort1=_.sortBy
		  (_.sortBy
		  	(_.sortBy(eskimoKids.kidArray, "firstName"),
		  "lastName"),
		 "age");
	ageSort1=new MainKidList(ageSort1);
	ageSort1.unrender(elem);
	ageSort1.render();
};

//instantiate for testing
var joeSmith=new Kid('Joe','Smith','9/1/2001','half-red','');
var janeSmith=new Kid('Jane','Smith','7/12/1997','blue','low-orange');
var samJones=new Kid('Sam','Jones','2/4/2006','','');
var pinkiePinkerton=new Kid('Pinkie','Pinkerton','6/22/2000','','low-silver');
var louieWilkse=new Kid('Louie','Wilkse','10/15/2006','','high-silver');
var emmaMilito=new Kid('Emma','Milito','7/31/2003','maroon','');
var isaBello=new Kid('Isa','Bello','4/10/1995','red10','');
var marthaSimbal=new Kid('Martha','Simbal','8/15/2003','blue','');

// create array to mimic db
var eskimoKids=new MainKidList([
	joeSmith,
	janeSmith,
	samJones,
	pinkiePinkerton,
	louieWilkse,
	emmaMilito,
	isaBello,
	marthaSimbal
	]);


$(document).on('ready', function() {
	// listener on SORT by ALPHA button	
	$('.container').on('click','.btn_name',function(){
		var elem=$(this);
		alphaSort(elem);
	});

	// adds existing kids to screen for review/editing
	eskimoKids.render();
	$('.btn_name').click();

	//listener on dob change and changes age
	$('.kid_container').on('change','[name="dob"]',function(){
		var elem=$(this);
		updateKidAge(elem);
		//updatePickList(elem);
	});

	// listener on SORT by AGE button
	$('.container').on('click','.btn_age',function(){
		var elem=$(this);
		ageSort(elem);
	});
		
	
// move this up to placeholder above
	$(document).on('submit', '#addKid', function(e){
		e.preventDefault();
		var firstName=$('#addKid').find('[name="firstName"]').val();
		var lastName=$('#addKid').find('[name="lastName"]').val();
		var dob=$('#addKid').find('[name="dob"]').val();
		var skiLevel=$('#addKid').find('[name="skiLevel"] option:selected').val();
		var sbLevel=$('#addKid').find('[name="sbLevel"] option:selected').val();
		var tempKid = new Kid(firstName,lastName,dob,skiLevel,sbLevel);
		eskimoKids.kidArray.push(tempKid);
		tempKid.renderKid();
		$('.btn_close').click();
	});	

	//console.log($(this));

	// save inputs to db -- no need now, since not hooked to db
			// $('.form-control').on('change',function(){
			// 	var elem=$(this);
			// 	console.log(elem.val());
			// });


}); //doc on ready end