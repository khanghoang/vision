var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var $ = require('gulp-load-plugins')();
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var app = 'app/index.js';

gulp.task('default', function() {
  return gulp.src(app)
  .pipe(webpack(webpackConfig))
  // .pipe($.size({ title : 'js' }))
});


