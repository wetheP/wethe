(function(){
	'use strict'
	angular.module('app').controller('HomeController', HomeController);
	HomeController.$inject = ['$state', 'HomeFactory'];

	function HomeController($state, HomeFactory){
		var vm = this;

		HomeFactory.getPins().then(function(res) {
			console.log('hitting home controler')
			console.log(res);
			vm.pins = res;
			
		});

		vm.addOne = function(id){
			console.log(vm.pins[id]._id)
			id = vm.pins[id]._id
			HomeFactory.addOne(id).then(function(res){
				HomeFactory.getPins().then(function(res) {
					console.log('hitting home controler')
					console.log(res);
					vm.pins = res;
				});
			})
		}
		vm.subOne = function(id){
			console.log(vm.pins[id]._id)
			id = vm.pins[id]._id
			HomeFactory.subOne(id).then(function(res){
				HomeFactory.getPins().then(function(res) {
					console.log('hitting home controler')
					console.log(res);
					vm.pins = res;
				});
			})
		}
	}

})()
