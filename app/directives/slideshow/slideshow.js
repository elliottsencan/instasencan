(function() {
    'use strict';

    angular
        .module('instatest.slideshow', ['instatest.api', 'instatest.slideshow.components'])
        .directive('slideshow', Slideshow);

    Slideshow.$inject = ['instagramEndpoint', '$timeout', '$rootScope'];

    function Slideshow(instagramEndpoint, $timeout, $rootScope) {
        return {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '='
            },
            template: [
                '<div class="slider-container centered" ng-class="{loading: loading === true, error: error === true}" ng-mouseover="clearTimer()" ng-mouseleave="startTimer()">',
                '<loader></loader>',
                '<error error="errorMessage"></error>',
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
                '</div>',
                '</a>',
                '<a class="next" ng-click="updateIndex(+1)">',
                '<span class="icon-wrap">',
                '<svg class="icon" width="32" height="32" viewBox="0 0 64 64">',
                '<use xlink:href="#arrow-right-3"></use>',
                '</svg>',
                '</span>',
                '<div>',
                '</div>',
                '</a>',
                '</div>',
                '</div>',
                '<div text-fade="index" class="info" ng-animate=" \'animate\' ">',
                '<user image="currentImage"></user>',
                '<likes image="currentImage"></likes>',
                '<comments image="currentImage"></comments>',
                '</div>'
            ].join(''),
            controller: SlideshowController,
            link: SlideshowLink
        }

        function SlideshowController($scope) {

            var timer,
                delay = 5000;

            $scope.startTimer = startTimer;
            $scope.clearTimer = clearTimer;
            $scope.getImages = getImages;
            $scope.updateIndex = updateIndex;
            $scope.$on('$destroy', function() {
                clearTimer(); // when the scope is getting destroyed, cancel the timer
            });


            function startTimer() {
                timer = $timeout(function() {
                    $scope.updateIndex(+1);
                    timer = $timeout(startTimer, delay);
                }, delay);
            };

            function clearTimer() {
                $timeout.cancel(timer);
            }

            function getImages(tag) {
                $scope.loading = true;
                clearTimer();
                //could be better, promise maybe?
                instagramEndpoint.searchTag(tag,
                    function success(data) {
                        $rootScope.safeApply(function() {
                            $scope.images = data;
                            if ($scope.images.length === 0) {
                                $scope.loading = false;
                                $scope.error = true;
                            } else {
                                $scope.currentImage = $scope.images[0];
                                $scope.loading = false;
                                $scope.error = false;
                                startTimer();
                            }
                        });
                    },
                    function error(error) {
                        $scope.error = true;
                        $scope.errorMessage = error;
                    }
                )
            }

            function updateIndex(offset) {


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
                }, 250);


            }
        }

        function SlideshowLink(scope, iElement, iAttrs, ngModelController) {

            scope.index = 0;
            scope.loading = true;
            scope.error;

            scope.getImages(scope.ngModel);

            scope.$watch('ngModel', function(newVal, oldVal) {
                if (newVal && (newVal !== oldVal)) {
                    scope.getImages(scope.ngModel);
                }
            });
        }

    }
})();