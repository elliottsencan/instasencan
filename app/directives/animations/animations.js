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
                console.log(element);
                console.log(attrs.textFade)
                scope.$watch(attrs.textFade, function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $animate.addClass(element, 'fadeOut', function() {
                            $animate.removeClass(element, 'fadeOut');
                        });
                    }
                })
            }
        }
    }
})();