(function() {
    'use strict';

    angular
        .module('instatest.animations', [])
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

    function TextFade(){
    	return{
    		restrict: 'A',
    		link: function(scope, element, attrs){
    			scope.$watch(attrs.uiFadeToggle, function(val, oldVal) {
                if(val === oldVal){ return };
                element[val ? 'fadeIn' : 'fadeOut'](1000);
            });
    		}
    	}
    }
})();