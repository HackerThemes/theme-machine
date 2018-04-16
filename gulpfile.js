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
    .pipe(gulp.dest('dist/vibrant-sea/images/'));

  return gulp.src(['themes/vibrant-sea/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/vibrant-sea/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/vibrant-sea/css/'));
});

gulp.task('build-business-tycoon', function() {
  return gulp.src(['themes/business-tycoon/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/business-tycoon/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/business-tycoon/css/'))
});

gulp.task('build-charming', function() {
  return gulp.src(['themes/charming/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/charming/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/charming/css/'))
});

gulp.task('build-daydream', function() {
  return gulp.src(['themes/daydream/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/daydream/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/daydream/css/'))
});

gulp.task('build-executive-suite', function() {
  gulp.src(['themes/executive-suite/images/*'])
    .pipe(gulp.dest('dist/executive-suite/images/'));

  return gulp.src(['themes/executive-suite/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/executive-suite/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/executive-suite/css/'))
});

gulp.task('build-good-news', function() {
  return gulp.src(['themes/good-news/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/good-news/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/good-news/css/'))
});

gulp.task('build-growth', function() {
  gulp.src(['themes/growth/images/*'])
    .pipe(gulp.dest('dist/growth/images/'));

  return gulp.src(['themes/growth/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/growth/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/growth/css/'))
});

gulp.task('build-harbor', function() {
  gulp.src(['themes/harbor/images/*'])
    .pipe(gulp.dest('dist/harbor/images/'));

  return gulp.src(['themes/harbor/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/harbor/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/harbor/css/'))
});

gulp.task('build-hello-world', function() {
  return gulp.src(['themes/hello-world/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/hello-world/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/hello-world/css/'))
});

gulp.task('build-pleasant', function() {
  return gulp.src(['themes/pleasant/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/pleasant/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/pleasant/css/'))
});

gulp.task('build-retro', function() {
  return gulp.src(['themes/retro/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/retro/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/retro/css/'))
});

gulp.task('build-wizardry', function() {
  gulp.src(['themes/wizardry/images/*'])
    .pipe(gulp.dest('dist/wizardry/images/'));

  return gulp.src(['themes/wizardry/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/wizardry/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/wizardry/css/'))
});

gulp.task('build-bubblegum', function() {
  return gulp.src(['themes/bubblegum/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/bubblegum/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/bubblegum/css/'))
});

gulp.task('build-daydream', function() {
  return gulp.src(['themes/daydream/css/*.scss'])
    .pipe(buildBootstrap())
    .pipe(gulp.dest('dist/daydream/css/'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/daydream/css/'))
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
    .pipe(nunjucks({data:{title:"Business Tycoon"}}))
    .pipe(gulp.dest('dist/business-tycoon/'));

  gulp.src('themes/charming/*.html')
    .pipe(nunjucks({data:{title:"Charming"}}))
    .pipe(gulp.dest('dist/charming/'));

  gulp.src('themes/executive-suite/*.html')
    .pipe(nunjucks({data:{title:"Executive Suite"}}))
    .pipe(gulp.dest('dist/executive-suite/'));

  gulp.src('themes/bubblegum/*.html')
    .pipe(nunjucks({data:{title:"Bubblegum"}}))
    .pipe(gulp.dest('dist/bubblegum/'));

  gulp.src('themes/good-news/*.html')
    .pipe(nunjucks({data:{title:"Good News"}}))
    .pipe(gulp.dest('dist/good-news/'));

  gulp.src('themes/daydream/*.html')
    .pipe(nunjucks({data:{title:"Daydream"}}))
    .pipe(gulp.dest('dist/daydream/'));

  gulp.src('themes/growth/*.html')
    .pipe(nunjucks({data:{title:"Growth"}}))
    .pipe(gulp.dest('dist/growth/'));

  gulp.src('themes/harbor/*.html')
    .pipe(nunjucks({data:{title:"Harbor"}}))
    .pipe(gulp.dest('dist/harbor/'));

  gulp.src('themes/pleasant/*.html')
    .pipe(nunjucks({data:{title:"Pleasant"}}))
    .pipe(gulp.dest('dist/pleasant/'));

  gulp.src('themes/retro/*.html')
    .pipe(nunjucks({data:{title:"Retro"}}))
    .pipe(gulp.dest('dist/retro/'));

  gulp.src('themes/wizardry/*.html')
    .pipe(nunjucks({data:{title:"Wizardry"}}))
    .pipe(gulp.dest('dist/wizardry/'));

  gulp.src('themes/hello-world/*.html')
    .pipe(nunjucks({data:{title:"Hello World"}}))
    .pipe(gulp.dest('dist/hello-world/'));

  gulp.src('themes/neon-glow/*.html')
    .pipe(nunjucks({data:{title:"Neon Glow"}}))
    .pipe(gulp.dest('dist/neon-glow/'));

  gulp.src('themes/default/*.html')
      .pipe(nunjucks())
      .pipe(gulp.dest('dist/default/'));
  }
);

gulp.task('watch', ['default'], function() {
  gulp.watch(['themes/vibrant-sea/css/*.scss'], ['build-vibrant-sea']);
  gulp.watch(['themes/bubblegum/css/*.scss'], ['build-bubblegum']);
  gulp.watch(['themes/daydream/css/*.scss'], ['build-daydream']);

  gulp.watch(['themes/executive-suite/css/*.scss'], ['build-executive-suite']);
  gulp.watch(['themes/good-news/css/*.scss'], ['build-good-news']);
  gulp.watch(['themes/growth/css/*.scss'], ['build-growth']);
  gulp.watch(['themes/harbor/css/*.scss'], ['build-harbor']);
  gulp.watch(['themes/hello-world/css/*.scss'], ['build-hello-world']);
  gulp.watch(['themes/pleasant/css/*.scss'], ['build-pleasant']);
  gulp.watch(['themes/retro/css/*.scss'], ['build-retro']);
  gulp.watch(['themes/wizardry/css/*.scss'], ['build-wizardry']);

  gulp.watch(['themes/business-tycoon/css/*.scss'], ['build-business-tycoon']);
  gulp.watch(['themes/charming/css/*.scss'], ['build-charming']);
  gulp.watch(['themes/neon-glow/css/*.scss'], ['build-neon-glow']);
  gulp.watch(['nunjucks/*.html', 'themes/**/*.html'], ['nunjucks']);
});

gulp.task('default', ['build-neon-glow', 'build-executive-suite', 'build-good-news', 'build-growth', 'build-harbor', 'build-hello-world', 'build-pleasant', 'build-retro', 'build-wizardry', 'build-charming', 'build-daydream', 'build-bubblegum', 'build-business-tycoon', 'build-vibrant-sea', 'nunjucks'], function() {
});
