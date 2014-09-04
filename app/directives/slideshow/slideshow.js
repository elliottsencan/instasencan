(function() {
    'use strict';

    angular
        .module('instatest.slideshow', ['instatest.api'])
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
                '<div ng-class="{loading: loading == true}" class="slider-container centered">',
                '<div class="loader">',
                '<svg>',
                '<path d="m 12.5,20 15,0 0,0 -15,0 z" class="led one"/>',
                '<path d="m 32.5,20 15,0 0,0 -15,0 z" class="led two"/>',
                '<path d="m 52.5,20 15,0 0,0 -15,0 z" class="led three"/>',
                '<path d="m 72.5,20 15,0 0,0 -15,0 z" class="led four"/>',
                '</svg>',
                '</div>',
                '<div class="slider">',
                '<div class="slide">',
                '<img text-fade="index" ng-animate="\'animate\'" imageloader ng-src="{{currentImage.images.standard_resolution.url}}" />',
                '</div>',
                '<div class="arrows">',
                '<a class="prev" ng-click="updateIndex(-1)">',
                '<span class="icon-wrap">',
                '<svg class="icon" width="32" height="32" viewBox="0 0 64 64">',
                '<use xlink:href="#arrow-left-3"></use>',
                '</svg>',
                '</span>',
                '<div>',
                // '<img ng-src="{{image.images.standard_resolution.url}}" alt="Thumb 1">',
                // '<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 2">',
                // '<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 3">',
                '</div>',
                '</a>',
                '<a class="next" ng-click="updateIndex(+1)">',
                '<span class="icon-wrap">',
                '<svg class="icon" width="32" height="32" viewBox="0 0 64 64">',
                '<use xlink:href="#arrow-right-3"></use>',
                '</svg>',
                '</span>',
                '<div>',
                // '<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 1">',
                // '<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 2">',
                // '<img ng-src="{{image.images.thumbnail.url}}" alt="Thumb 3">',
                '</div>',
                '</a>',
                '</div>',
                '</div>',
                '<div text-fade="index" class="info" ng-animate=" \'animate\' ">',
                '<div class="info-user">',
                '<img ng-src="{{currentImage.user.profile_picture}}" />',
                '<h5>{{ currentImage.user.full_name }}</h5>',
                '<p>{{ currentImage.created_time | date:"medium" }}</p>',
                //'<p>{{currentImage | json}}</p>',
                '</div>',
                '</div>'
            ].join(''),
            controller: SlideshowController,
            link: SlideshowLink
        }

        function SlideshowController($scope) {

            var timer,
                delay = 5000;

            function autoSlider() {
                timer = $timeout(function() {
                    $scope.updateIndex(+1);
                    timer = $timeout(autoSlider, delay);
                }, delay);
            };

            autoSlider();

            $scope.getImages = function(tag) {
            	$scope.loading = true;
            	//$timeout.cancel(timer);
                var images = [];
                //could be better, promise maybe?
                instagramEndpoint.searchTag(tag,
                    function success(data) {
                        $rootScope.safeApply(function() {
                        	console.log(data);
                            $scope.images = data;
                            $scope.currentImage = $scope.images[0];
                            $scope.loading = false;
                        });
                    },
                    function error(error) {
                        console.log(error);
                    }
                )
            }


            $scope.updateIndex = function(offset) {

                if (!!isNaN(parseFloat(offset))) {
                    return false;
                }

                var oldIndex = $scope.index,
                    newIndex = oldIndex + offset;

                if (newIndex === -1) {
                    newIndex = $scope.images.length - 1;
                }

                if (newIndex === $scope.images.length) {
                    newIndex = 0;
                }

                $scope.index = newIndex;

                $timeout(function() {
                    $scope.currentImage = $scope.images[$scope.index];
                }, 150);

                $timeout.cancel(timer);

            }

            $scope.$on('$destroy', function() {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });
        }

        function SlideshowLink(scope, iElement, iAttrs, ngModelController) {

            scope.index = 0;
            scope.loading = true;

            scope.getImages(scope.ngModel);

            scope.$watch('ngModel', function(newVal, oldVal) {
                if (newVal && (newVal !== oldVal)) {
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