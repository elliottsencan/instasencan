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
                '<div class="slider">',
                '<div class="slide" ng-repeat="image in images">',
                '<img imageloader ng-src="{{image.images.standard_resolution.url}}" />',
                '</div>',
                '<div class="arrows">',
                '<a href="#" ng-click="prev()">',
                '</a>',
                '<a href="#" ng-click="next()">',
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
                	console.log(iElement);
                    scope.getImages(scope.ngModel);
                }
            });
        }

    }

    function ImageOnload() {
    	console.log('yo');
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    console.log(element[0].classList.add('visible'));
                });
            }
        };
    }
})();