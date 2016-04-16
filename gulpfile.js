var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var $ = require('gulp-load-plugins')();
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var app = 'app/';
var devtoolsPanel = app + 'index.js';
var backgroundPage = 'background/background.js';

gulp.task('build-panel-dev', function() {
  return gulp.src([
    devtoolsPanel
  ])
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./dist'))
});

gulp.task('build-background-dev', function() {
  var query = {
    presets: ['react', 'es2015', 'stage-1']
  }
  return gulp.src(backgroundPage)
  .pipe(webpack({
    entry: {
      javascript: './background/background.js'
    },

    output: {
      filename: 'background.js',
      path: __dirname + '/dist'
    },

    devtool: 'source-map',

    module: {
      loaders: [
        {
          // babel
          test: /\.js/,
          exclude: /node_modules/,
          loaders: ['react-hot','babel-loader?'+JSON.stringify(query)],
          include: __dirname
        }
      ]
    }
  }))
  .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*', ['build-panel-dev']);
  gulp.watch('./background/**/*.*js', ['build-background-dev']);
});

gulp.task('default', ['build-panel-dev', 'build-background-dev', 'watch'])


