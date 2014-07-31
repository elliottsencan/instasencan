var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var debug = require('gulp-debug');
var path = require('path');
var express = require("express");
var port = 3000;
var server;

gulp.task('vendor', function() {
    return gulp.src(['vendor/angular.min.js', 'vendor/angular-route.min.js'])
        .pipe(concat('angular-all.min.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(notify({ message: 'Vendor task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src('src/app.js')
        .pipe(uglify({
            compress: {
                negate_iife: false
            }
        }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

var createServer = function(port) {
    var express = require('express');
    var app = express();

    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/:file', function(req, res) {
      var file = req.params.file;
        res.sendfile('./public/' + file);   
    });

    app.get('/:dir/:file', function(req, res) {
      var dir = req.params.dir,
        file = req.params.file;
        res.sendfile('./public/' + dir + '/' + file);   
    });

    return app.listen(port, function() {
        console.log('Listening on port %d', server.address().port);
    });
};

gulp.task('watch', function() {
    gulp.watch('src/app.js', ['scripts']);
});

gulp.task('server', function() {
    if (!server) {
        server = createServer(port);
    }
});

gulp.task('default', ['vendor', 'scripts', 'watch', 'server']);
