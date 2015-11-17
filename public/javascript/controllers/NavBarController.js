(function() {
	"use strict";
	angular.module('app').controller('NavBarController', NavBarController);
	NavBarController.$inject = ['$state', 'UserFactory', "$rootScope", '$timeout'];

	function NavBarController($state, UserFactory, $rootScope, $timeout) {
		var vm = this;
		vm.user = {};
		vm.status = $rootScope._user;
		vm.class = 'fadeInLeft'
		console.log(vm.status)
		vm.register = function() {
			console.log('in register function')
			UserFactory.register(vm.user).then(function() {
				vm.user = {};
				$state.go('Home');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function() {
				console.log('made it back to login function in nav controller')
				vm.status = $rootScope._user;
				$timeout(function() {
					$state.go('Home')
					vm.class = 'fadeInLeft'
				}, 400);
				
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.status = $rootScope._user;
			$state.go("Home");
		}
		vm.getUser = function(){
			console.log('working inside get userFunction')
			UserFactory.getUser(vm.status.id).then(function(res){
				vm.pinUser = res
				console.log('got user')
				console.log(vm.pinUser)
			})
		}
		if(vm.status.id){
				vm.getUser();
		}
	
	}
})();
