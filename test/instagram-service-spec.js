describe("Instagram Service Unit Test", function() {

        beforeEach(angular.mock.module('instatest.api', 'ngResource', 'instatest.constants'));

        it('should contain an ngResource service', inject(function($resource) {
            expect($resource).toBeDefined();
        }));

        it('should contain an instatest.constants service with the ACCESS_TOKEN', inject(function(ACCESS_TOKEN) {
            expect(ACCESS_TOKEN).toBeDefined();
        }));

        it('should contain an instatest.constants service with the ACCESS_TOKEN', inject(function(ACCESS_TOKEN) {
            expect(ACCESS_TOKEN).toBeDefined();
        }));

        it('should have instagramEndpoint service be defined', inject(function(instagramEndpoint) {
            expect(instagramEndpoint).toBeDefined();
        }));

        describe("Mocked HTTP Requests", function() {
            var $httpBackend,
                ACCESS_TOKEN = '1483275.5b9e1e6.0e1ebb1c18344fe6be64ac91aa3e0dc7',
                tag = 'servicenow',
                callback = angular.noop;

            beforeEach(inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('JSONP', 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + ACCESS_TOKEN + '&callback=JSON_CALLBACK')
                    .respond(200, {});
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should have sent a JSONP request to the instagram API', inject(function(instagramEndpoint) {
                var result = instagramEndpoint.searchTag(tag, callback);
                $httpBackend.expectJSONP('https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + ACCESS_TOKEN + '&callback=JSON_CALLBACK');
                $httpBackend.flush();
            }));
        });
});