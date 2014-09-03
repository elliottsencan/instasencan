(function() {
    'use strict';

    angular
        .module('instatest.api')
        .factory('instagramEndpoint', InstagramEndpoint);

    InstagramEndpoint.$inject = ['$resource', 'instatest.constants'];

    function InstagramEndpoint($resource, ACCESS_TOKEN) {
        var service = {
            searchTag: searchTag
        };

        return service;

        function searchTag(tag, callback) {

            var api = $resource('https://api.instagram.com/v1/tags/:tag/media/recent?access_token=:access_token&callback=JSON_CALLBACK', {
                access_token: ACCESS_TOKEN,
                tag: tag
            }, {
                fetch: {
                    method: 'JSONP'
                }
            });

            api.fetch(function(response) {
                callback(response.data);
            });

        }
    }


})();