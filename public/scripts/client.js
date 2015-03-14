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
});

// factory to hook up database
eskimoApp.factory('KidDetail', function($resource){
	var eskimos = $resource(
		'/routePlaceholder/:id',
		{id: '@_id'},
		{delete: {
			method: 'PUT'
		}},
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
		'/routePlaceholder/:id',
		{id: '@_id'}
	);
	return{
		model: levellist,
		detail: levellist.query()
	};
});


// angular controllers
eskimoApp.controller('homeController',function(){});

eskimoApp.controller('adminController',function($scope, $modal, $routeParams, KidDetail, LevelList){
	$scope.kids=KidDetail.detail;

	$scope.open = function (size) {

	var modalInstance = $modal.open({
		templateUrl: 'addModalContent',
		controller: 'modalController',
		size: size,
		resolve: {
			kids: function () {
			return $scope.kids;
			}
		}
	});

	modalInstance.result.then(function (selectedKid) {
		$scope.selected = selectedKid;
			var tempKid=new KidDetail.model(selectedKid);
			tempKid.$save(function(savedKid){
			var modelKid=new KidDetail.model(savedKid);
			});
		}); 
  };

  	// delete selected kid; MUST have put route in app.js and add to factory
		$scope.delete = function(id){
			KidDetail.model.delete({id:id, method:true});		
		};

	// update selected kid; MUST have put route in app.js and add to factory
		$scope.update=function(fieldname, fieldvalue){
			console.log(fieldname, fieldvalue);
			//console.log(KidDetail.model.find({id:id}));
		};
});

eskimoApp.controller('modalController',function($scope, $modal, $routeParams, KidDetail){
	//console.log('modalController');
	// $scope.kids=KidDetail.detail;

	// $scope.selected={
	// 	kid: $scope.kids[0]
	// };

	// $scope.cancel=function(){
	// 	$modalInstance.dismiss('cancel');
	// };

	// $scope.kid={};
	// $scope.addNewKid=function(){

	// 	var tempKid=new KidDetail.model($scope.kid);
	// 	tempKid.$save(function(savedKid){
	// 		var modelKid=new KidDetail.model(savedKid);
	// 		console.log(modelKid.name.first);
	// 		//KidDetail.kids.push(modelKid);
	// 	});

	// };
});





