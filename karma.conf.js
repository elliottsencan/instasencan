module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'vendor/angular.min.js',
            'vendor/angular-mocks.js',
            'app/**/*.js',
            'app/**/*-spec.js'
        ]
    });
};