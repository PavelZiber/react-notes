/* eslint-env node */
'use strict';

var bg = require('gulp-bg');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var makeWebpackConfig = require('./webpack/makeconfig');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');
var gutil = require('gulp-util');
var runSequence = require('run-sequence').use(gulp);
var run = require('gulp-run');

var args = {};
args.production = gutil.env.build;

gulp.task('env', function() {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('eslint', function() {
  return gulp.src([
    'gulpfile.js',
    'tests/*.js',
    'src/**/*.js',
    'webpack/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('server',
  [
    'env',
    args.production ? 'build-webpack-production' : 'build-webpack-dev'
  ],
  bg('node', 'src/server')
);

gulp.task('default', function() {
  runSequence('eslint', 'server');
});

gulp.task('test', function() {
  runSequence('default', function() {
    run('protractor protractor.conf.js').exec();
  });
});
