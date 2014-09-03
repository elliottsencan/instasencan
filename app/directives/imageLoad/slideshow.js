// (function() {
//     'use strict';

//     angular
//         .module('instatest.components')
//         .directive('imageOnload', ImageOnload);

//     function ImageOnload() {
//         return {
//             restrict: 'A',
//             link: function(scope, element, attrs) {
//                 element.bind('load', function() {
//                     alert('image is loaded');
//                 });
//             }
//         };
//     }

// })();