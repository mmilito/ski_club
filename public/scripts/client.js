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
		})
		.when('/busSched',{
			templateUrl: '/templates/busSched',
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
	var data={
		model: eskimos,
		detail: eskimos.query()
	};
	data.update=function(){
		data.detail=eskimos.query();
		return data.detail;
	};
	return data;
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
eskimoApp.controller('adminController',function($scope, $modal, $routeParams, $filter, KidDetail, LevelList){
	$scope.kids=KidDetail.detail;
	$scope.predicate='name.last';  // default sort by last name

	$scope.levels=LevelList.detail;
	//$scope.oneKid=null;

	$scope.reloadRoute=function(){
		// cancel edit mode and re-enter edit mode
		return $scope.kids;
	};


	//NEW KID modal
	$scope.openNew=function (size) {
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
			KidDetail.detail.push(modelKid);
			});
		}); 
	};

	//UPDATE KID via modal; complete data
	$scope.openExisting=function (selectedKid) {
		//console.log('here', selectedKid);
		var temp=[];
		temp.push(selectedKid);
		var temp2= _.pluck(temp,'_id');
		//console.log('sk',selectedKid);
		var temp3=_.find($scope.kids,function(obj){
			//console.log('typeof1',typeof obj._id);
			//console.log('typeof2',typeof temp2);
			return obj._id===selectedKid._id;
		});
		//console.log('temp3',temp3);
		var modalInstance=$modal.open({
			templateUrl: 'updateModalContent',
			controller: 'adminController',
			//size: size,
			resolve: {
				oneKid: function(){
					$scope.oneKid=temp3;
					return $scope.oneKid;
				}
			}
		});
		//console.log($scope.oneKid);
	};


// 	// delete selected kid; MUST have put route in app.js and delete method in factory
// 	// method:true property is flag to trigger logic in kidController.js tells delete not update
		$scope.delete=function(id){
			KidDetail.model.update({id:id, method:true}, function(err,results){
				if(err){console.log(err);}
	
			});		
		};

		$scope.filterUser=function(kid){
			return kid.isDeleted !== true;
		};

		$scope.deleteFromView=function(id){
			var filtered=$filter('filter')($scope.kids,{id:id});
			if(filtered.length){
				filtered[0].isDeleted=true;
			}
		};

// 	// update selected kid INLINE - no modal; running to same endpoint as delete w/o delete flag
		$scope.update=function(id, self, fieldname){
			var newValue=(
				{	id: id,
					fieldname: fieldname,
					newValue: self.$data
				});
			//$scope.message='UPDATED';
			KidDetail.model.update(newValue);

		};


		$scope.busStops=[
			{stop:'Parker'},
			{stop:'Arapahoe Crossing'},
			{stop:'Arapahoe Rd & I25'},
			{stop:'Hampden & Happy Canyon'},
			{stop:'Quebec & County Line'},
			{stop:'SouthGlenn'},
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
			{color:'half-red',label:'half-red'},
			{color:'red',label:'red'},
			{color:'half-maroon',label:'half-maroon'},
			{color:'maroon',label:'maroon'},
			{color:'half-white',label:'half-white'},
			{color:'white',label:'white'},
			{color:'low-black',label:'low-black'},
			{color:'top-black',label:'top-black'},
			{color:'TBC',label:'TBC'},
			{color:'na',label:'na'}
		];

		$scope.tenSbValues=[
			{color:'new-green10',label:'new-green10'},
			{color:'high-green10',label:'high-green10'},
			{color:'low-silver10',label:'low-silver10'},
			{color:'high-silver10',label:'high-silver10'},
			{color:'low-orange10',label:'low-orange10'},
			{color:'high-orange10',label:'high-orange10'},
			{color:'low-pink10',label:'low-pink10'},
			{color:'high-pink10',label:'high-pink10'},
			{color:'low-purple10',label:'low-purple10'},
			{color:'high-purple10',label:'high-purple10'},
			{color:'RBC',label:'RBC'},
			{color:'na',label:'na'}
		];

		$scope.oldSbValues=[
			{color:'new-green',label:'new-green'},
			{color:'high-green',label:'high-green'},
			{color:'low-silver',label:'low-silver'},
			{color:'high-silver',label:'high-silver'},
			{color:'low-orange',label:'low-orange'},
			{color:'high-orange',label:'high-orange'},
			{color:'low-pink',label:'low-pink'},
			{color:'high-pink',label:'high-pink'},
			{color:'low-purple',label:'low-purple'},
			{color:'high-purple',label:'high-purple'},
			{color:'RBC',label:'RBC'},
			{color:'na',label:'na'}
			];

		$scope.skiValues=function(category){
			if (category ==='ten') {
				return $scope.tenSkiValues;
			} else {
				return $scope.oldSkiValues;
			}
			 //console.log('cat',category);
		};

		$scope.sbValues=function(category){
			if (category ==='ten') {
				return $scope.tenSbValues;
			} else {
				return $scope.oldSbValues;
			}
			 //console.log('cat',category);
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





