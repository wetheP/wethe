(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q', '$rootScope'];

	function HomeFactory($http, $q, $rootScope) {
		var o = {};
		o.pin = {}
		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}
		o.CreateNewPin = function(pin){
			var q = $q.defer();
			
			pin.user = $rootScope._user.id
			console.log(pin)
			
			// pin.user = $rootScope.user.id
			// console.log('this is user id'  + pin.user)
			// console.log('creating new pin line 13')
			$http.post('/pin', pin, getAuth()).success(function(res){
				q.resolve();
			})
			return q.promise; 
		}
		
		o.getPins = function(){
			var q = $q.defer();
			console.log('inside homefactory')
			$http.get('/pin')
			.success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.getPin = function(id){
			console.log(id);
			var q = $q.defer();
			console.log('in side get Pin in homefactory')
			$http.get('/pin/' +  id, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/comments', comment, getAuth()).success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		}
		o.deleteComment = function(id){
			var q = $q.defer();
			$http.delete('/comments/' + id, getAuth()).success(function(res){
				console.log('hit')
				q.resolve(res);
				console.log(res)
			})
			return q.promise;
		}
		o.editComment = function(id, comment) {
			var q = $q.defer();
			$http.post('/comments/' + id, comment, getAuth()).success(function(res){
				console.log('trying to make request to change comment')
				q.resolve(res);
			})
			return q.promise; 
		}
		o.addOne = function(id){
			var q = $q.defer();
			$http.post('/pin/add/' + id, null, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.subOne = function(id){
			var q = $q.defer();
			$http.post('/pin/sub/' + id, null, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;

		}
		o.editPin = function(id, pin){
			var q = $q.defer();
			$http.post('/pin/' + id, pin, getAuth()).success(function(res){
				q.resolve();
			})
			return q.promise;
		}
		o.deletePin = function(id){
			var q = $q.defer();
			$http.post('/pin/delete/' + id, null, getAuth()).success(function(res){
				q.resolve();
			})
			 return q.promise;
		}
		o.addFriend = function(id, userid){
			var q = $q.defer();
			console.log(userid + 'this is user id')
			$http.post('/users/add/friend/' + id + '/' + userid, null, getAuth()).success(function(res){
				q.resolve();
			})
			  return q.promise;
		}
		return o;
	}
})();
