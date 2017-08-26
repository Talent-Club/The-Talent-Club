(function () {
	'use strict';

	angular.module('app', [
			// Angular modules
			'ngMaterial',
			// Custom modules
			'app.admin',
			'app.auth',
			'app.core',
			'app.landing',
			'app.login',
			'app.pending',
			'app.signUp',
			'app.splash',
			'app.stripe',
			'app.core',
			// 3rd Party Modules
			'ui.router',
			'LocalStorageModule',
			'stripe.checkout'
		])
		.value('apiUrl', 'http://localhost:3000/api')
		.config(appConfig)
		.run(appRun);

	appConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider', 'StripeCheckoutProvider'];

	function appConfig($urlRouterProvider, $stateProvider, $httpProvider, StripeCheckoutProvider) {
		// define default page-where should the first page of the app begin

		StripeCheckoutProvider.defaults({
                key: 'pk_test_A6aawS4muwkwSlOWuTYv1m2I'
            })

		$httpProvider.interceptors.push('authInterceptorService');

		$urlRouterProvider.otherwise('/landing');

		// define a state : $stateProvider.state(<name>, <options>)
		$stateProvider.state('landing', {
			url: '/landing',
			controller: 'LandingController as landingCtrl',
			templateUrl: 'app/landing/landing.template.html'
		});

		$stateProvider.state('login', {
			url: '/login',
			controller: 'LoginController as loginCtrl',
			templateUrl: 'app/login/login.template.html'
		});

		$stateProvider.state('pending', {
			url: '/pending',
			controller: 'PendingController as pendingCtrl',
			templateUrl: 'app/pending/pending.template.html'
		});


		$stateProvider.state('signup', {
			url: '/signup',
			controller: 'SignUpController as signUpCtrl',
			templateUrl: 'app/signUp/signUp.template.html'
		});

		$stateProvider.state('splash', {
			url: '/splash?id',
			controller: 'SplashController as splashCtrl',
			templateUrl: 'app/splash/splash.template.html'
		});

		$stateProvider.state('stripe', {
			url: '/stripe',
			controller: 'StripeController as stripeCtrl',
			templateUrl: 'app/stripe/stripe.template.html'
		});

		$stateProvider.state('admin', {
			url: '/admin',
			controller: 'AdminController as adminCtrl',
			templateUrl: 'app/admin/admin.template.html'
		});
	}

	appRun.$inject = ['$log', 'StripeCheckout'];

	function appRun($log, StripeCheckout) {
		// You can set defaults here, too.
		StripeCheckout.defaults({
			opened: function () {
				$log.debug("Stripe Checkout opened");
			},
			closed: function () {
				$log.debug("Stripe Checkout closed");
			}
		});
	}
})();
