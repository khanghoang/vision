var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var $ = require('gulp-load-plugins')();
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var app = 'app/';
var devtoolsPanel = app + 'index.js';

gulp.task('build-dev', function() {
  return gulp.src([
    devtoolsPanel
  ])
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*', ['build-dev']);
});

gulp.task('default', ['build-dev', 'watch'])


