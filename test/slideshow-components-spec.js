describe("Unit: Slideshow COmponents", function() {

    var $compile, $rootScope;

    beforeEach(angular.mock.module('instatest.slideshow.components'));

    beforeEach(inject(
        ['$compile', '$rootScope',
            function($c, $r) {
                $compile = $c;
                $rootScope = $r;
            }
        ]
    ));

    describe("loader", function() {

        it("should display properly", function() {
            var element = $compile('<loader></loader>')($rootScope);
            expect(element.html()).toBeDefined();
        });

        it("should have the class loader", function() {
            var element = $compile('<loader></loader>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element.html()).hasClass('loader')).toBe(true);
        })

    });

    describe("user", function() {

        it("should display properly", function() {
            var element = $compile('<user></user>')($rootScope);
            expect(element.html()).toBeDefined();
        });

        it("should have the class info-user", function() {
            var element = $compile('<user></user>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element.html()).hasClass('info-user')).toBe(true);
        });

        it("should display the appropriate text", function() {
            var element = $compile('<user image="currentImage"></user>')($rootScope);
            $rootScope.currentImage = {
                user: {
                    profile_picture: 'http://lorempixel/200x200',
                    full_name: 'dave brubeck'
                },
                created_time: '12:00',
                caption: {
                    text: 'caption'
                },
            };
            $rootScope.$digest();
            expect(angular.element(element.html()).find('h5').text()).toBe('dave brubeck');
        });

    });

    describe("comments", function() {

        it("should display properly", function() {
            var element = $compile('<comments></comments>')($rootScope);
            expect(element.html()).toBeDefined();
        });

        it("should have the class info-comments", function() {
            var element = $compile('<comments></comments>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element.html()).hasClass('info-comments')).toBe(true);
        });

    });

    describe("likes", function() {

        it("should display properly", function() {
            var element = $compile('<likes></likes>')($rootScope);
            expect(element.html()).toBeDefined();
        });

        it("should have the class info-likes", function() {
            var element = $compile('<likes></likes>')($rootScope);
            $rootScope.$digest();
            expect(angular.element(element.html()).hasClass('info-likes')).toBe(true);
        });

    });


});