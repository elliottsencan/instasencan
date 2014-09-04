(function() {
    'use strict';

    angular
        .module('instatest.animations', ['ngAnimate'])
        .directive('imageloader', ImageOnload)
        .directive('textFade', TextFade);

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

    TextFade.$inject = ['$animate'];

    function TextFade($animate) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.textFade, function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        console.log('changed');
                        console.log(element);
                        console.log($animate);
                        $animate.addClass(element, 'fadeOut', function() {
                            console.log(element);
                            console.log('class was removed');
                            $animate.removeClass(element, 'fadeOut');
                        });
                    }
                })
            }
        }
    }
})();