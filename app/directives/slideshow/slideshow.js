(function() {
    'use strict';

    angular
        .module('instatest.components', ['instatest.api'])
        .directive('slideshow', Slideshow)
    ///move this out of here asap
    .directive('imageloader', ImageOnload);

    Slideshow.$inject = ['instagramEndpoint', '$timeout', '$rootScope'];

    function Slideshow(instagramEndpoint, $timeout, $rootScope) {
        return {
            restrict: 'E',
            require: '^ngModel',
            replace: true,
            scope: {
                ngModel: '='
            },
            template: [
                '<div class="slider centered">',
                	'<div class="slide" ng-repeat="image in images" ng-show="image.visible">',
                		'<img imageloader ng-src="{{image.images.standard_resolution.url}}" />',
                	'</div>',
                	'<div class="arrows">',
                		'<a class="prev" ng-click="prev()">',
			            	'<span class="icon-wrap">',
			            		'<svg class="icon" width="32" height="32" viewBox="0 0 64 64">',
			            			'<use xlink:href="#arrow-left-3"></use>',
			            		'</svg>',
			            	'</span>',
			            	'<div>',
			            		'<img ng-src="{{image.images.standard_resolution.url}}" alt="Thumb 1">',
			            		'<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 2">',
			            		'<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 3">',
			            	'</div>',
			            '</a>',
			            '<a class="next" ng-click="next()">',
			            	'<span class="icon-wrap">',
			            		'<svg class="icon" width="32" height="32" viewBox="0 0 64 64">',
			            			'<use xlink:href="#arrow-right-3"></use>',
			            		'</svg>',
			            	'</span>',
			            	'<div>',
			            		'<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 1">',
			            		'<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 2">',
			            		'<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 3">',
			            	'</div>',
			            '</a>',
                	'</div>',
                '</div>'
            ].join(''),
            controller: SlideshowController,
            link: SlideshowLink
        }

        function SlideshowController($scope) {

            $scope.getImages = function(tag) {
                var images = [];
                //could be better, promise maybe?
                instagramEndpoint.searchTag(tag,
                    function success(data) {
                        console.log(data);
                        $rootScope.safeApply(function() {
                            $scope.images = data;
                            $scope.images[0].visible= true;
                        });
                    },
                    function error(error) {
                        console.log(error);
                    }
                )
            }
        }

        function SlideshowLink(scope, iElement, iAttrs, ngModelController) {

            scope.getImages(scope.ngModel);

            scope.$watch('ngModel', function(newVal) {
                if (newVal) {
                    scope.getImages(scope.ngModel);
                }
            });
        }

    }

    function ImageOnload() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    element[0].classList.add('visible');
                });
            }
        };
    }
})();