(function() {
	"use strict";
	angular.module('app').factory('UserFactory', UserFactory);
	UserFactory.$inject = ['$q', '$http', "$window", "$rootScope"];

	function UserFactory($q, $http, $window, $rootScope) {
		var o = {};
		o.status = {};
		if(getToken()){
			o.status.isLoggedIn = true;
			o.status._id = getId();
			// o.status.friends = getFriends();
		}
		console.log(o.status)
		// console.log()

		function getId(){
			return JSON.parse(urlBase64Decoder(getToken().split('.')[1])).id;
		}
		// function getFriends(){
		// 	return JSON.parse(urlBase64Decoder(getToken().split('.')[1])).friends;
		// }
		function setToken(token) {
			localStorage.setItem("token", token);
		}

		function removeToken() {
			localStorage.removeItem("token");
		}

		function getToken() {
			return localStorage.token;
		}

		function isLoggedIn() {
			var token = getToken();
			if(token) {
				var payload = JSON.parse(urlBase64Decoder(token.split(".")[1]));
				if(payload.exp > Date.now() / 1000) {
					console.log('this is the payload ' +  payload)
					return payload;

				}
			} else {
				return false;
			}
		}

		o.getUser = function(id){
			console.log(id)
			console.log('inside getUser Function!')
			var q = $q.defer();
			$http.get('/users/' + id).success(function(res){
				console.log('getting res from user request')
				q.resolve(res);
			})
			return q.promise;
		}


		o.register = function(user) {
			console.log('we are in the register function')
			var q = $q.defer();
			$http.post('/users/register', user).success(function(res) {
				console.log('made request to register user')
				// o.status.isLoggedIn = true;
				// o.status.username = user.username;
				q.resolve();
			});
			return q.promise;
		};

		o.login = function(user) {
			console.log('trying to login')
			user.username = user.username.toLowerCase();
			console.log(user)
			var q = $q.defer();
			$http.post('/users/login', user).success(function(res) {

				setToken(res.token);
				console.log(res.token);
				$rootScope._user = isLoggedIn();
				q.resolve();
			});
			return q.promise;
		};

		o.logout = function() {
			removeToken();
			o.status = {};
			$rootScope._user = isLoggedIn();
		}

		function urlBase64Decoder(str) {
			var output = str.replace(/-/g, '+').replace(/_/g, '/');
			switch(output.length % 4) {
				case 0:{break; }
				case 2: {output += '=='; break;}
				case 3: {output += '='; break;}
				default:
					throw 'Illegal base64url string'
			}
			return decodeURIComponent(escape($window.atob(output)));
		}

		$rootScope._user = isLoggedIn();
		return o;
	}
})();