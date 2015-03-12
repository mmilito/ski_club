// CLIENT SIDE ANGULAR

var eskimoApp = angular.module('eskimoApp',['ngRoute','ngResource','xeditable']);


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

// hook up database
eskimoApp.factory('KidDetail', function($resource){
	var eskimos = $resource(
		'/routePlaceholder/:id',
		{id: '@_id'}
	);
	return{
		eskimos: eskimos,
		detail: eskimos.query()
	};
});

// angular routes aka controllers
eskimoApp.controller('homeController',function(){});

eskimoApp.controller('adminController',function($scope, KidDetail){
	$scope.kids=KidDetail.detail;
});
