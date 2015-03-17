// CLIENT SIDE ANGULAR

var eskimoApp = angular.module('eskimoApp',['ngRoute','ngResource','xeditable','ui.bootstrap']);


//angular routing to hook up app.js routes and angular routes
eskimoApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: '/templates/home',
			controller: 'homeController'
		})
		.when('/admin',{
			templateUrl: '/templates/admin',
			controller: 'adminController'
		});
		// .when('/newUser',{
		// 	templateUrl: '/templates/newUser',
		// 	controller: 'levelController'
		// });
});

// factory to hook up database
eskimoApp.factory('KidDetail', function($resource){
	var eskimos = $resource(
		'/routePlaceholder/:id',
		{id: '@_id'},
		{update: {
			method: 'PUT'
		}}
	);
	return{
		model: eskimos,
		detail: eskimos.query()
	};
});

eskimoApp.factory('LevelList', function($resource){
	var levellist = $resource(
		'/routeToLevels/:id',
		{id: '@_id'}
	);
	return{
		model: levellist,
		detail: levellist.query()
	};
});


//ANGULAR CONTROLLERS
// home
eskimoApp.controller('homeController',function(){});


// kid detail controller
eskimoApp.controller('adminController',function($scope, $modal, $routeParams, KidDetail, LevelList){
	$scope.kids=KidDetail.detail;
	$scope.predicate='name.last';  // default sort by last name

	$scope.levels=LevelList.detail;
	//console.log('first',$scope.levels);
	//console.log('second',$scope.levels[0]);

	$scope.open=function (size) {

	var modalInstance=$modal.open({
		templateUrl: 'addModalContent',
		controller: 'adminController',
		size: size,
		resolve: {
			kids: function () {
			return $scope.kids;
			}
		}
	});

	modalInstance.result.then(function (selectedKid) {
		$scope.selected=selectedKid;
			var tempKid=new KidDetail.model(selectedKid);
			tempKid.$save(function(savedKid){
			var modelKid=new KidDetail.model(savedKid);
			});
		}); 
	};

// 	// delete selected kid; MUST have put route in app.js and delete method in factory
// 	// method:true property is flag to trigger logic in kidController.js tells delete not update
		$scope.delete=function(id){
			KidDetail.model.update({id:id, method:true});		
		};

// 	// update selected kid; running to same endpoint as delete w/o delete flag
		$scope.update=function(id, self, fieldname){
			var newValue=(
				{	id: id,
					fieldname: fieldname,
					newValue: self.$data
				});
			//console.log('values',id, self, fieldname);
			//console.log(newValue);
			KidDetail.model.update(newValue);

		};

		$scope.busStops=[
			{stop:'Parker'},
			{stop:'Arapahoe Crossing'},
			{stop:'Arapahoe Rd & I25'},
			{stop:'Hampden & Happy Canyon'},
			{stop:'Quebec & County Line'},
			{stop:'SouthGlenn'},
			{stop:'Hampden & Happy Canyon'},
			{stop:'Ken Caryl & 470'},
			{stop:'Calvary Temple'},
			{stop:'8th & Youngfield'},
			{stop:'Lower Genesee'}
		];

		$scope.tenSkiValues=[
			{color:'green10', label:'green10'},
			{color:'yellow10', label:'yellow10'},
			{color:'blue10', label:'blue10'},
			{color:'half-red10', label:'half-red10'},
			{color:'red10', label:'red10'},
			{color:'half-maroon10', label:'half-maroon10'},
			{color:'maroon10', label:'maroon10'},
			{color:'half-white10', label:'half-white10'},
			{color:'white10', label:'white10'},
			{color:'low-black10', label:'low-black10'},
			{color:'top-black10', label:'top-black10'},
			{color:'TBC', label:'TBC'},
			{color:'na', label:'na'}
		];

		$scope.oldSkiValues=[
			{color:'green', label:'green'},
			{color:'yellow',label: 'yellow'},
			{color:'blue',label:'blue'},
			{color:'half-red',label:'blue'},
			{color:'red',label:'red'},
			{color:'half-maroon',label:'red'},
			{color:'maroon',label:'maroon'},
			{color:'half-white',label:'half-white'},
			{color:'white',label:'white'},
			{color:'low-black',label:'low-black'},
			{color:'top-black',label:'top-black'},
			{color:'TBC',label:'TBC'},
			{color:'na',label:'na'}
		];

		$scope.skiValues=function(category){
			if (category ==='ten') {
				return $scope.tenSkiValues;
			} else {
				return $scope.oldSkiValues;
			}
			 console.log('cat',category);
		};


}); // end adminController

// level Controller
eskimoApp.controller('levelController',function($scope, $modal, $routeParams){
		// KID SKI AND SB LEVELS	
	// $scope.levels=LevelList.detail;
	// 	console.log(LevelList);

	// $scope.levelLookup=function(){
	// 	console.log('here');
	// 	return($scope.levels);
	//};

});  // end levelController





