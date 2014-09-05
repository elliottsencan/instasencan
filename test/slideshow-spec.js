// describe("Unit: Slideshow", function() {

//     var $compile, $rootScope;

//     beforeEach(angular.mock.module('instatest.slideshow'));

//     beforeEach(inject(
//         ['$compile', '$rootScope',
//             function($c, $r) {
//                 $compile = $c;
//                 $rootScope = $r;
//             }
//         ]
//     ));

//     describe("slideshow", function() {

//         it("should display properly", function() {
//             var element = $compile('<slideshow ng-model="{{tag}}"></slideshow>')($rootScope);
//             $rootScope.$digest();
//             expect(element.html()).toBeDefined();
//         });

//         it("should have the class slide-container", function() {
//             var element = $compile('<slideshow ng-model="{{tag}}"></slideshow>')($rootScope);
//             $rootScope.$digest();
//             expect(angular.element(element.html()).hasClass('slide-container')).toBe(true);
//         })

//     });


// });