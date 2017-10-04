"use strict";

var gulp  = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    scsslint = require('gulp-scss-lint'),
    postcss      = require('gulp-postcss'),
    lazypipe = require('lazypipe'),
    rename = require('gulp-rename'),
    nunjucks = require('gulp-nunjucks-render'),
    autoprefixer = require('autoprefixer');

// Lazypipes to define some standard built pipes that every theme goes through
var buildBootstrap = lazypipe()
                    .pipe(scsslint, {'config':'scsslint.yml'})
                    .pipe(sourcemaps.init)
                    .pipe(function () {
                      return sass().on('error', sass.logError);
                    })
                    .pipe(postcss, [ autoprefixer({ browsers: [
                      'Chrome >= 35',
                      'Firefox >= 38',
                      'Edge >= 12',
                      'Explorer >= 10',
                      'iOS >= 8',
                      'Safari >= 8',
                      'Android 2.3',
                      'Android >= 4',
                      'Opera >= 12']})])
                     .pipe(sourcemaps.write);

var minifyCss = lazypipe()
                .pipe(cleanCss)
                .pipe(rename, {suffix: '.min'});

// Note: The build tasks can't be 100% dry for performance reasons as each build
//       takes about 1 second. Would add up if I rebuilt every folder on each change

gulp.task('build-default', function() {
  return gulp.src(['themes/default/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/default/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/default/css/'))

});

gulp.task('build-crazy', function() {
  return gulp.src(['themes/crazy/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/crazy/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/crazy/css/'))
});

gulp.task('build-vibrant-sea', function() {
  return gulp.src(['themes/vibrant-sea/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/vibrant-sea/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/vibrant-sea/css/'))
});

// nunjucks.configure({autoescape: true});

gulp.task('nunjucks', function() {
  gulp.src('themes/crazy/*.html')
      .pipe(nunjucks())
      .pipe(gulp.dest('dist/crazy/'));

  gulp.src('themes/vibrant-sea/*.html')
    .pipe(nunjucks())
    .pipe(gulp.dest('dist/vibrant-sea/'));

  gulp.src('themes/default/*.html')
      .pipe(nunjucks())
      .pipe(gulp.dest('dist/default/'))
  }
);

gulp.task('watch', ['default'], function() {
  gulp.watch(['themes/default/css/*.scss'], ['build-default']);
  gulp.watch(['themes/crazy/css/*.scss'], ['build-crazy']);
  gulp.watch(['themes/vibrant-sea/css/*.scss'], ['build-vibrant-sea']);
  gulp.watch(['nunjucks/*.html', 'themes/**/*.html'], ['nunjucks']);
});

gulp.task('default', ['build-default', 'build-crazy', 'build-vibrant-sea', 'nunjucks'], function() {
});
