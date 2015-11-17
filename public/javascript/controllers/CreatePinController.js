(function(){
	'use strict'
	angular.module('app').controller('CeatePinController', CeatePinController);
	CeatePinController.$inject = ['$state', 'HomeFactory', '$timeout'];

	function CeatePinController($state, HomeFactory, $timeout){
		var vm = this;
		vm.pin = {}
		vm.class = "fadeInRight"
		vm.CreatePin = function(){
			vm.pin.created = new Date(vm.pin.created + '-1-1');
			console.log('inside CreatePin controller')
			HomeFactory.CreateNewPin(vm.pin).then(function(res){
				console.log('back to the state');
				console.log('this is the res to creating pin ' + res);
				$timeout(function() {
					$state.go('Home');
					vm.class = "fadeInRight"
				}, 400);
				
			})
		}
	}

})()
