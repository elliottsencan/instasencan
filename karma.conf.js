module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'vendor/angular.min.js',
            'vendor/angular-route.min.js',
            'vendor/angular-resource.js',
            'vendor/angular-animate.js',
            'vendor/angular-mocks.js',
            'app/**/*.js',
            'test/*.js'
        ]
    });
};