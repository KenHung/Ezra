var gulp = require('gulp');
var gfi = require('gulp-file-insert');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');

gulp.task('min', function () {
  return gulp.src('src/*.js')
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/temp/'));
});

gulp.task('import', function () {
  var ezra = gulp.src('src/ezra.js')
    .pipe(gfi({
      '/* import tether */': 'src/temp/tether.min.js',
      '/* import drop */': 'src/temp/drop.min.js',
      '/* import resources */': 'src/lang/resources.js',
      '/* import bibleService */': 'src/bibleService.js'
    }));
  ezra.pipe(gfi({'/* import lang */': 'src/lang/zh-Hant.js'}))
    .pipe(gulp.dest('./'));
  return ezra.pipe(gfi({'/* import lang */': 'src/lang/zh-Hans.js'}))
    .pipe(rename('ezra.sc.js'))
    .pipe(gulp.dest('./'));
});

gulp.watch('src/*.js', gulp.series('min', 'import'));
gulp.watch('src/lang/*.js', gulp.parallel('import'));

gulp.task('default', gulp.series('min', 'import'));