describe("Unit: animations", function() {

    var $compile, $rootScope;

    beforeEach(angular.mock.module('instatest.animations'));

    beforeEach(inject(
        ['$compile', '$rootScope',
            function($c, $r) {
                $compile = $c;
                $rootScope = $r;
            }
        ]
    ));

    describe("image on load directive", function() {

        it("should not have a class visible when first starting", function() {
            var element = $compile('<img src="http://lorempixel.com/400/200" imageLoader />')($rootScope);
            $rootScope.$digest();

            expect(angular.element(element).hasClass('visible')).toBe(false);
        });

        it("should  have a class visible when image is loaded", function() {
            var element = $compile('<img src="http://lorempixel.com/400/200" imageLoader />')($rootScope);
            $rootScope.$digest();

            //this isnt great but im not sure how to do this... revisit. just giving it a bunch of time to load
            waits(4000);

            runs(function() {
                expect(angular.element(element).hasClass('visible')).toBe(true);
            })


        });

    });

    describe("text fade directive", function() {

        it("should not have a class fadeOut when first starting", function() {
            var element = $compile('<p text-fade="index">{{image.name}}</p>')($rootScope);

            $rootScope.index = 0;
            $rootScope.image = {
                name: 'Douglas'
            };
            $rootScope.$digest();
            expect(angular.element(element).hasClass('fadeOut')).toBe(false);
        });

        it("should add a class to the element when the index changes", function() {
            var element = $compile('<p text-fade="index">{{image.name}}</p>')($rootScope);

            $rootScope.index = 0;
            $rootScope.image = {
                name: 'Douglas'
            };
            $rootScope.$digest();
            expect(angular.element(element).hasClass('fadeOut')).toBe(false);
            //change the index, see if it registers that
            $rootScope.index = 1;
            $rootScope.$digest();
            expect(angular.element(element).hasClass('fadeOut')).toBe(true);

            //how to test this?... revisit
            // waits(1000);

            // runs(function() {
            //     expect(angular.element(element).hasClass('fadeOut')).toBe(false);
            // });



        });

    });



});