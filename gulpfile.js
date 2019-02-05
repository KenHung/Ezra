var gulp = require('gulp');
var gfi = require('gulp-file-insert');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');
var header = require('gulp-header');

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
      '/* {{insert-file:drop.min.js}} */': 'src/temp/drop.min.js'
    }));
  ezra.pipe(gfi({'/* {{insert-file:lang.js}} */': 'src/lang/zh-Hant.js'}))
    .pipe(gulp.dest('./'));
  return ezra.pipe(gfi({'/* {{insert-file:lang.js}} */': 'src/lang/zh-Hans.js'}))
    .pipe(rename('ezra.sc.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('update-gh-pages', function () {
  return gulp.src('readme.md')
    .pipe(header('---\r\nlayout: index\r\n---\r\n\r\n'))
    .pipe(rename('index.md'))
    .pipe(gulp.dest('docs/'));
});

gulp.watch('src/*.js', gulp.series('min', 'insert'));
gulp.watch('src/lang/*.js', gulp.parallel('insert'));

gulp.watch('README.md', gulp.parallel('update-gh-pages'));

gulp.task('default', gulp.series('min', 'insert', 'update-gh-pages'));