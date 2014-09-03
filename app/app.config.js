(function() {
    'use strict';

    angular
        .module('instatest.config', [])
        .run(Run);

    Run.$inject = ['$rootScope'];

    function Run($rootScope) {
        $rootScope.safeApply = function(fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    }


})();