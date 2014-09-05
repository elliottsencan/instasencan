(function() {
    'use strict';

    angular
        .module('instatest.slideshow.components', [])
        .directive('user', User)
        .directive('likes', Likes)
        .directive('loader', Loader)
        .directive('error', Error)
        .directive('comments', Comments);

    function User() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                image: '='
            },
            template: [
                '<div class="info-user">',
                '<img ng-src="{{image.user.profile_picture}}" />',
                '<h5>{{ image.user.full_name }}</h5>',
                '<p>{{ image.created_time | date:"medium" }}</p>',
                '<p class="caption">{{ image.caption.text | date:"medium" }}</p>',
                '</div>'
            ].join('')
        };
    }

    function Likes() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                image: '='
            },
            template: [
                '<div class="info-likes">',
                '<p><a ng-repeat="liker in image.likes.data | limitTo:2">{{liker.username}}, </a>',
                'and {{image.likes.count - 2}} others like this photo</p>',
                '</div>'
            ].join('')
        };
    }

    function Comments() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                image: '='
            },
            template: [
                '<ul class="info-comments">',
                '<li class="comment" ng-repeat="comment in image.comments.data">',
                '<cite class="author">',
                '<img ng-src="{{ comment.from.profile_picture }}" width="60" height="60" />',
                '{{ comment.from.username }}',
                '</cite>',
                '<p>{{ comment.text }}</p>',
                '</li>',
                '</ul>',
            ].join('')
        };
    }

    function Loader() {
        return {
            restrict: 'E',
            replace: true,
            template: [
                '<div class="loader">',
                '<svg>',
                '<path d="m 12.5,20 15,0 0,0 -15,0 z" class="led one"/>',
                '<path d="m 32.5,20 15,0 0,0 -15,0 z" class="led two"/>',
                '<path d="m 52.5,20 15,0 0,0 -15,0 z" class="led three"/>',
                '<path d="m 72.5,20 15,0 0,0 -15,0 z" class="led four"/>',
                '</svg>',
                '</div>',
            ].join('')
        };
    }

    function Error() {
        return {
            restrict: 'E',
            replace: true,
            scope:{
                error: '='
            },
            template: [
                '<div class="error">',
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">',
                '<path id="error-3-icon" d="M341.328,50H170.672L50,170.672v170.656L170.672,462h170.656L462,341.328V170.672L341.328,50z',
                'M256.46,398.518c-16.207,0-29.345-13.139-29.345-29.346c0-16.205,13.138-29.342,29.345-29.342',
                'c16.205,0,29.342,13.137,29.342,29.342C285.802,385.379,272.665,398.518,256.46,398.518z M295.233,158.239',
                'c-2.481,19.78-20.7,116.08-26.723,147.724c-1.113,5.852-6.229,10.1-12.187,10.1h-0.239c-6.169,0-11.438-4.379-12.588-10.438',
                'c-6.1-32.121-24.293-128.504-26.735-147.971c-2.94-23.441,15.354-44.171,38.977-44.171',
                'C279.674,113.483,298.213,134.488,295.233,158.239z"></path>',
                '</svg>',
                '<div class="error-message">',
                '<h2>There\'s been an error</h2>',
                '<p>Please try searching a different tag or, if your problem persists, please check back later</p>',
                '<small>{{error}}</small>',
                '</div>',
                '</div>',
            ].join('')
        };
    }
})();