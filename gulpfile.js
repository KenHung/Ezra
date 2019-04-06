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

gulp.task('insert', function () {
  var ezra = gulp.src('src/ezra.js')
    .pipe(gfi({
      '/* {{insert-file:tether.min.js}} */': 'src/temp/tether.min.js',
      '/* {{insert-file:drop.min.js}} */': 'src/temp/drop.min.js',
      '/* {{insert-file:bibleService.js}} */': 'src/bibleService.js'
    }));
  ezra.pipe(gfi({'/* {{insert-file:lang.js}} */': 'src/lang/zh-Hant.js'}))
    .pipe(gulp.dest('./'));
  return ezra.pipe(gfi({'/* {{insert-file:lang.js}} */': 'src/lang/zh-Hans.js'}))
    .pipe(rename('ezra.sc.js'))
    .pipe(gulp.dest('./'));
});

gulp.watch('src/*.js', gulp.series('min', 'insert'));
gulp.watch('src/lang/*.js', gulp.parallel('insert'));

gulp.task('default', gulp.series('min', 'insert'));