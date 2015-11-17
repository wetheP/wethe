(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			contorller: 'HomeController',
			templateUrl: 'views/home.html'
		}).state('CreatePin', {
			url: '/createPin',
			controller: 'CeatePinController',
			templateUrl: 'views/CreatePin.html',
			controllerAs: 'vm'
		}).state('PinInfo', {
			url: '/pin/:id',
			controller: 'PinInfoController',
			controllerAs: 'vm',
			templateUrl: 'views/PinInfo.html'
		}).state('RegisterUser', {
			url: '/register',
			templateUrl: 'views/Register.html'
		}).state('LogIn', {
			url: '/login',
			templateUrl: '/views/Login.html'
		}).state('Profile', {
			url: '/profile',
			templateUrl: 'views/Profile.html',
			controller: 'NavBarController',
			controllerAs: 'vm'
		}).state('EditPin', {
			url: '/pin/edit/:id',
			controller: 'PinInfoController',
			controllerAs: 'vm',
			templateUrl: '/views/EditPin.html'
		})
		$urlRouterProvider.otherwise('/');
	}
})();
