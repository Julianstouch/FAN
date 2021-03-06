(function() {
	'use strict';

	var app = angular.module('welcome', ['ngResource', 'authentication']);

	app.controller('WelcomeCtrl', function($rootScope, $location, $resource, $log, authentication) {
		if (authentication.state != 'logged') {
			$location.url('/login');
			return;
		}
		$log.debug('logged');
		this.message = 'Welcome ' + authentication.login + '!';
		this.user = $resource('data/' + authentication.login + '.json').get();
		this.user.$promise.catch(function(error) {
			$log.error('error', error);
		});
	});
})();
