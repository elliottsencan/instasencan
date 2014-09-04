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
                '<div class="slider-container centered">',
                '<div class="slider">',
                '<div class="slide" ng-repeat="image in images" ng-show="image.visible">',
                '<img imageloader ng-src="{{image.images.standard_resolution.url}}" />',
                '</div>',
                '<div class="arrows">',
                '<a class="prev" ng-click="updateIndex(-1)">',
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
                '<a class="next" ng-click="updateIndex(+1)">',
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
                '</div>',
                '<div text-fade="currentImage.created_time" class="info">',
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

            //autoSlider();

            $scope.getImages = function(tag) {
                var images = [];
                //could be better, promise maybe?
                instagramEndpoint.searchTag(tag,
                    function success(data) {
                        console.log(data);
                        $rootScope.safeApply(function() {
                            $scope.images = data;
                            $scope.images[$scope.index].visible = true;
                            $scope.currentImage = $scope.images[$scope.index];
                            console.log($scope.currentImage);
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

                if (newIndex === $scope.images.length){
                	newIndex = 0;
                }

                $scope.index = newIndex;

                $rootScope.safeApply(function() {
                    $scope.images[oldIndex].visible = false;
                    $scope.images[newIndex].visible = true;
                    $scope.currentImage = $scope.images[$scope.index];
                });

                $timeout.cancel(timer);
                autoSlider();

            }

            $scope.$on('$destroy', function() {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });
        }

        function SlideshowLink(scope, iElement, iAttrs, ngModelController) {

            scope.index = 0;

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