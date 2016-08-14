var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

var app = 'app/';
var devtoolsPanel = app + 'index.js';
var backgroundPage = 'background/background.js';

var query = {
  presets: ['react', 'es2015', 'stage-1']
}

gulp.task('webpack', function() {
  return gulp.src([
    devtoolsPanel
  ])
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./app/script'))
});

gulp.task('copy-sinon', () => {
  return gulp.src('./app/script.babel/sinon.js')
  .pipe(gulp.dest('./app/script'))
});

gulp.task('babel', () => {
  return gulp.src('app/scripts.babel/**/*.js')
      .pipe($.babel({
              presets: ['es2015']
            }))
      .pipe(gulp.dest('app/scripts'));
});

gulp.task('watch', ['babel'], function() {
  $.livereload.listen();

  gulp.watch([
    'app/script.babel/*.html',
    'app/script.babel/**/*.js',
  ]).on('change', $.livereload.reload);

  gulp.watch('./app/script.babel/**/*', ['watch']);
});

gulp.task('default', [
  'webpack',
  'watch'
])


