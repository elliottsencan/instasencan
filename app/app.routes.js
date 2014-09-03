(function(){
	'use strict';

	angular
		.module('instatest.routes', ['ngRoute'])
		.config(RouterConfig);

		RouterConfig.$inject = ['$routeProvider', '$locationProvider'];

		function RouterConfig ($routeProvider, $locationProvider) {
			$routeProvider
            .when('/tag/:tag', {
                //controller: 'slideshow'
            })
            .otherwise({
                redirectTo: '/'
            });
		}
})();
