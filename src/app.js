angular.module('instatest', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/tag/:tag', {
			controller: 'slideshow'
		})
		.otherwise({
			redirectTo: '/'
		});
}])

.controller('slideshow', ['$scope', '$http', '$timeout', '$route', '$location', function($scope, $http, $timeout, $route, $location) {
	var api = 'https://api.instagram.com/v1/tags/%tag%/media/recent?access_token=1483275.5b9e1e6.0e1ebb1c18344fe6be64ac91aa3e0dc7&callback=JSON_CALLBACK',
		newReq, 
		refreshApi,
		REFRESH_1 = '6000',
		REFRESH_2 = '2000';
		REFRESH_3 = '1000';

	$timeout(function() {		
		$scope.loadingClass = 'loading';
		$scope.imgCurrent = 0;
		$scope.fetchImages = arguments.callee;

		if (!$route.current)
			$location.path('/tag/' + $scope.tag);
		else if (angular.isDefined($route.current.params.tag))
			$scope.tag = $route.current.params.tag;

		$http.jsonp( 
			api.replace('%tag%', $scope.tag)
		).then(function(response) {
			delete $scope.loadingClass;
			$scope.images = response.data.data;
			if (response.data.data.length) {
				var index = $scope.imgCurrent;
				delete $scope.images[$scope.imgCurrent].isActive;
				$scope.imgCurrent = index % $scope.images.length;
				$scope.images[$scope.imgCurrent].isActive = true;
			}
			if (refreshApi)
				$timeout.cancel(refreshApi);
			if (response.data.data.length)
				refreshApi = $timeout(arguments.callee, int(REFRESH_1) * response.data.data.length);
		},
		function(reason) {
			if (reason)
				delete $scope.loadingClass;
			refreshApi = $timeout($scope.fetchImages, int(REFRESH_2));
		});
	});

	$timeout(function() {
		if (angular.isDefined($scope.images) && $scope.images.length) {
			var index = $scope.imgCurrent + 1;
			delete $scope.images[$scope.imgCurrent].isActive;
			$scope.imgCurrent = index % $scope.images.length;
			$scope.images[$scope.imgCurrent].isActive = true;
		}
		$timeout(arguments.callee, int(REFRESH_1));
	});

	$scope.tc = function() {
		$location.path('/tag/' + $scope.tag);
		if (newReq)
			$timeout.cancel(newReq);
		newRequest = $timeout(function() {
			$scope.fetchImages.call(null);
			$timeout.cancel(newRequest);
		}, int(REFRESH_3));
	}

	var int = function(val) {
		return ~~val;
	}
}])

.filter('escape', function() {
	return function(input) {
		return escape(input);
	}
});
