(function(){
	'use strict';

	angular
		.module('instatest.components', ['instatest.api'])
		.directive('slideshow', Slideshow);

		Slideshow.$inject = ['instagramEndpoint'];


		function Slideshow ( instagramEndpoint ){
			return {
				restrict: 'E',
				require: '^ngModel',
				scope: {
					ngModel: '='
				},
				template: '<div>{{ngModel}}</div>'
			}
		}
})();