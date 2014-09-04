(function() {
    'use strict';

    angular
        .module('instatest.slideshow.components', [])
        .directive('user', User)
        .directive('likes', Likes)
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
})();