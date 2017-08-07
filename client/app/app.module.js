(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ngMaterial',
        // Custom modules
        'app.landing',
        // 3rd Party Modules
        'ui.router'
    ]).config(appConfig);

	appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

	function appConfig($urlRouterProvider, $stateProvider) {
		// define default page-where should the first page of the app begin
		$urlRouterProvider.otherwise('/landing');

		// define a state : $stateProvider.state(<name>, <options>)
		$stateProvider.state('landing', {
			url: '/landing',
			controller: 'LandingController as landingCtrl',
			templateUrl: 'app/landing/landing.template.html'
		});
    }
})();
