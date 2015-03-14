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

// eskimoApp.factory('LevelList', function($resource){
// 	var levellist = $resource(
// 		'/routeToLevels/:id',
// 		{id: '@_id'}
// 	);
// 	return{
// 		model: levellist,
// 		detail: levellist.query()
// 	};
// });


//ANGULAR CONTROLLERS
// home
eskimoApp.controller('homeController',function(){});


// kid detail controller
eskimoApp.controller('adminController',function($scope, $modal, $routeParams, KidDetail){
	$scope.kids=KidDetail.detail;

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
		$scope.update=function(id, self, fieldname, fieldvalue){
			var origValue=(
				{	id: id,
					fieldname: fieldname,
					origValue: fieldvalue
				});
			var newValue=(
				{	id: id,
					fieldname: fieldname,
					newValue: self.$data
				});
			KidDetail.model.update(newValue);
		};

		$scope.tenSkiValues=[
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

		$scope.tenSki=function(){
			console.log($scope.tenSkiValues);
			$scope.tenSki=$scope.tenSkiValues[0];
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





