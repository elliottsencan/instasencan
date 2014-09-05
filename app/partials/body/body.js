(function() {
    'use strict';

    angular
        .module('instatest.body', [])
        .controller('bodyCtrl', BodyCtrl);

    BodyCtrl.$inject = ['$scope'];

    function BodyCtrl($scope) {
        var vm = this;

        vm.tag = 'servicenow';
        vm.taginit = 'servicenow';
        //this should go in a directive
        vm.enterActive = false;

        vm.clearModel = clearModel;
        vm.setModel = setModel;

        function clearModel (){
        	//this should go in a directive
        	vm.enterActive = true;
        	vm.tag = '';
        }

        function setModel (){
        	//this should go in a directive
        	vm.enterActive = false;
        	vm.tag = vm.taginit;
        }

    }
})();