var gulp  = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    scsslint = require('gulp-scss-lint'),
    fs = require('fs'),
    path = require('path'),
    postcss      = require('gulp-postcss'),
    rename = require('gulp-rename'),
    nunjucks = require('gulp-nunjucks-render'),
    autoprefixer = require('autoprefixer');

var themesPath = 'themes';

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

function buildHtml(cb) {
    var folders = getFolders(themesPath);
    if (folders.length === 0) return cb();

    folders.map(function(folder) {
        var data = JSON.parse(fs.readFileSync(themesPath + '/' + folder + '/data.json'));
        // var data = {};
        if (fs.existsSync(path.join(themesPath, folder, "images/"))) {
            gulp.src(path.join(themesPath, folder, "images/**/*"))
                .pipe(gulp.dest(path.join('dist/' + folder + '/images/')));
        }

        return gulp.src(path.join(themesPath, folder, '**.html'))
            .pipe(nunjucks({"data" : data}))
            .pipe(gulp.dest('dist/' + folder));
    });

    cb();
}

function buildCss(cb) {
  var folders = getFolders(themesPath);
  if (folders.length === 0) return cb();

  folders.map(function(folder) {
      // build the theme
      return gulp.src(path.join(themesPath, folder, 'css/**.scss'))
          .pipe(scsslint({'config':'scsslint.yml'}))
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([ autoprefixer({ browsers: [
              'Chrome >= 35',
              'Firefox >= 38',
              'Edge >= 12',
              'Explorer >= 10',
              'iOS >= 8',
              'Safari >= 8',
              'Android 2.3',
              'Android >= 4',
              'Opera >= 12']})]))
          .pipe(gulp.dest('dist/' + folder + '/css'))
          .pipe(cleanCss())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('dist/' + folder + '/css'));
  });

  cb();
}

function watcher(cb) {
    gulp.watch(['scss/*.scss', 'themes/**/css/*.scss'], gulp.series(buildCss));
    gulp.watch(['html/**/*.html', 'themes/**/*.html', 'modules/theme-machine/nunjucks/**/*'], gulp.series(buildHtml));
}

exports.buildHtml = buildHtml;
exports.buildCss = buildCss;
exports.default = gulp.series(buildHtml, buildCss);
exports.watch = gulp.series(buildCss, buildHtml, watcher);
