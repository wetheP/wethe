(function(){
	'use strict'
	angular.module('app').controller('PinInfoController', PinInfoController);
	PinInfoController.$inject = ['$stateParams', '$state', 'HomeFactory', 'UserFactory', '$timeout']

	function PinInfoController($stateParams, $state, HomeFactory, UserFactory, $timeout){
		var vm = this;
		console.log('hitting movieinfo controller')
		vm.pin = {}
		vm.status = UserFactory.status
		console.log(vm.status)
		vm.class = 'zoomInDown';
		if (!$stateParams.id){
			 $state.go('Home')
			}else{
				HomeFactory.getPin($stateParams.id).then(function(res){
					// console.log(res)
					// console.log('made it to getPin function')
					vm.pin = res
					// console.log(vm.pin)
				})
		}
		vm.deleteComment = function(id){
			// console.log('inside function delete')
			var temp = id;
			// console.log(id)
			id = vm.pin.comments[id]._id
			// console.log(id)
			// console.log(temp)
			// console.log(vm.pin.comments)
			HomeFactory.deleteComment(id).then(function(res){
				console.log('am i at the splice?.')
				vm.pin.comments.splice(temp, 1);

			})
		}	

		vm.createComment = function() {
			var comment = {
				body: vm.newComment,
				pin: $stateParams.id
			};
			HomeFactory.createComment(comment).then(function (res) {
				vm.newComment = '';
				// console.log(res);
				// vm.movie.comments.push(res);
				HomeFactory.getPin($stateParams.id).then(function (res) {
					vm.pin = res;
					// console.log(vm.pin);
				});
			})
		}
		vm.editComment = function(id){
			var comment = {
				body: vm.editedComment
			}
			
			id = vm.pin.comments[id]._id
			// console.log('this is the comment id ' + id)
			// console.log(vm.editedComment)
			HomeFactory.editComment(id, comment).then(function (res){
				console.log('finished request to change comment')
				HomeFactory.getPin(vm.pin._id).then(function (res){
					vm.pin = res;
					// console.log(vm.pin);
				})
			})
		}
		vm.editPin = function(id){
			var newPin = {
				title: vm.newTitle,
				img: vm.newImg,
				desc: vm.newDesc
			}
			// console.log('trying to edit pin')
			// console.log(newPin)
			HomeFactory.editPin(id, newPin).then(function (res) {
				$timeout(function() {
					$state.go('Home');
					vm.class="zoomInDown"
				}, 400);
				
			})
		}
		vm.deletePin = function(id){
			// console.log('trying to delete pin')
			// console.log(id)
			HomeFactory.deletePin(id).then(function(res){
				$state.go('Home');
			})
		}
		vm.addFriend = function(id){
			console.log('this is the friend ' + id);
			// console.log(vm.status)
			HomeFactory.addFriend(id, vm.status._id).then(function(res){
				console.log('added friend' + id)
			})
		}

	}
})();