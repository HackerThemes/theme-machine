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

gulp.task('build-vibrant-sea', function() {
  gulp.src(['themes/vibrant-sea/images/*'])
    .pipe(gulp.dest('dist/vibrant-sea/images/'))

  return gulp.src(['themes/vibrant-sea/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/vibrant-sea/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/vibrant-sea/css/'))
});

gulp.task('build-business-tycoon', function() {
  return gulp.src(['themes/business-tycoon/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/business-tycoon/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/business-tycoon/css/'))
});

gulp.task('build-neon-glow', function() {
  gulp.src(['themes/neon-glow/images/*'])
    .pipe(gulp.dest('dist/neon-glow/images/'))

  return gulp.src(['themes/neon-glow/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/neon-glow/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/neon-glow/css/'))
});

// nunjucks.configure({autoescape: true});

gulp.task('nunjucks', function() {
  gulp.src('themes/vibrant-sea/*.html')
    .pipe(nunjucks({data:{title:"Vibrant Sea"}}))
    .pipe(gulp.dest('dist/vibrant-sea/'));

  gulp.src('themes/business-tycoon/*.html')
    .pipe(nunjucks({data:{title:"Vibrant Sea"}}))
    .pipe(gulp.dest('dist/business-tycoon/'));

  gulp.src('themes/neon-glow/*.html')
    .pipe(nunjucks({data:{title:"Neon Glow"}}))
    .pipe(gulp.dest('dist/neon-glow/'));

  gulp.src('themes/default/*.html')
      .pipe(nunjucks())
      .pipe(gulp.dest('dist/default/'))
  }
);

gulp.task('watch', ['default'], function() {
  gulp.watch(['themes/vibrant-sea/css/*.scss'], ['build-vibrant-sea']);
  gulp.watch(['themes/business-tycoon/css/*.scss'], ['build-business-tycoon']);
  gulp.watch(['themes/neon-glow/css/*.scss'], ['build-neon-glow']);
  gulp.watch(['nunjucks/*.html', 'themes/**/*.html'], ['nunjucks']);
});

gulp.task('default', ['build-neon-glow','build-business-tycoon', 'build-vibrant-sea', 'nunjucks'], function() {
});
