(function(){
	'use strict';

	angular
		.module('instatest.body', [])
		.controller('bodyCtrl', BodyCtrl);

		BodyCtrl.$inject = [];

		function BodyCtrl (){
			var vm = this;

			vm.tag = 'servicenow';

			console.log(vm);

		}
})();