var gulp = require('gulp');
var gfi = require('gulp-file-insert');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

gulp.task('min', function () {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/temp/'));
});

gulp.task('insert', function () {
  return gulp.src('src/ezra.js')
    .pipe(gfi({
      '/* Tether to be inserted */': 'src/temp/tether.min.js',
      '/* Drop to be inserted */': 'src/temp/drop.min.js'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('update-gh-pages', function () {
  return gulp.src('readme.md')
    .pipe(header('---\r\nlayout: index\r\n---\r\n\r\n'))
    .pipe(rename('index.md'))
    .pipe(gulp.dest('docs/'));
});

gulp.watch('src/*.js', gulp.parallel('min'));
gulp.watch('src/temp/*.js', gulp.parallel('insert'));
gulp.watch('readme.md', gulp.parallel('update-gh-pages'));

gulp.task('default', gulp.parallel('min', 'update-gh-pages'));