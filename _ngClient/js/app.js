var angularnodeApp = angular.module("angularnodeApp", // may be easier to maintain dependencies this way
	['ngRoute',
		'ngResource'
	]);

angularnodeApp.config(['$routeProvider', '$httpProvider', '$provide',
	'$locationProvider',
	function($routeProvider, $httpProvider, $provide, $locationProvider) {
		// You can not ask for instance during configuration phase - you can ask only for providers.
		console.log("angularnodeApp.config") // runs once only
		$locationProvider.hashPrefix(''); // prevents #! with Angular 1.6.x
		//  Force AngularJS to call our web service with a 'GET' rather than an 'OPTION'
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$routeProvider.
		    when('/login', {
				templateUrl: './partials/login.html',
				controller: 'LoginCtrl'
			}).
			when('/register', {
				templateUrl: './partials/register.html',
				controller: 'RegisterCtrl'
			}).
			//Home Ctrl
			when('/home', {
				templateUrl: './partials/home.html',
				controller: 'HomeCtrl'
			}).
			//Portfolio Ctrl
			when('/portfolio', {
				templateUrl: './partials/portfolio.html',
				controller: 'portfolioController'
			}).
			//Portfolio Ctrl end
			//Redirect to home
		 otherwise({
		 	redirectTo: '/home'
		 });
	}
]);
