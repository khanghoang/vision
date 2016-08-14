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

gulp.task('build-devtools-dev', function() {
  return gulp.src([
    devtoolsPanel
  ])
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./dist'))
});

gulp.task('build-background-dev', function() {
  return gulp.src(backgroundPage)
  .pipe(webpack({
    entry: {
      background: './background/background.js',
      sinon: './background/sinon.js'
    },

    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },

    devtool: 'source-map',

    module: {
      loaders: [
        {
          // babel
          test: /\.js/,
          exclude: /node_modules/,
          loaders: ['babel-loader?'+JSON.stringify(query)],
          include: __dirname
        }
      ]
    }
  }))
  .pipe(gulp.dest('./dist'))
});

gulp.task('build-panel-dev', function() {
  return gulp.src(backgroundPage)
  .pipe(webpack({
    entry: {
      javascript: './panel/panel.js'
    },

    output: {
      filename: 'panel.js',
      path: __dirname + '/dist'
    },

    devtool: 'source-map',

    module: {
      loaders: [
        {
          // babel
          test: /\.js/,
          exclude: /node_modules/,
          loaders: ['babel-loader?'+JSON.stringify(query)],
          include: __dirname
        }
      ]
    }
  }))
  .pipe(gulp.dest('./dist'))
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
    'app/*.html',
    'app/scripts/**/*.js',
  ]).on('change', $.livereload.reload);

  gulp.watch('./app/**/*', ['build-devtools-dev']);
  gulp.watch('./background/**/*.*js', ['build-background-dev']);
  gulp.watch('./panel/**/*.*js', ['build-panel-dev']);
});

gulp.task('default', [
  'build-devtools-dev',
  'build-background-dev',
  'build-panel-dev',
  'watch'
])


