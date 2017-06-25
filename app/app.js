(function() {

	'use strict';

	angular
		.module('app', [
			'ngRoute'
		])

		.config(['$routeProvider',
			function ($routeProvider) {

				$routeProvider
					.when('/', {
						templateUrl: 'home/home.html',
						controller: 'HomeCtrl'
					})
					.otherwise({
						redirectTo: '/'
					});
			}
		]);

}());