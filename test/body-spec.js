describe("Instatest body controller unit test", function() {

   var $rootScope, $scope, $controller;

  beforeEach(angular.mock.module('instatest.body'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('bodyCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
    }));

  it('should initialize the scope tag to start ta servicenow', function() {
    expect($scope.tag === 'servicenow')
  });

});