var gulp = require('gulp');
var gfi = require('gulp-file-insert');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('min', function () {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./src/temp/'));
});

gulp.task('ezra', function () {
  gulp.src('./src/ezra.js')
    .pipe(gfi({
      '/* Tether to be inserted */': 'src/temp/tether.min.js',
      '/* Drop to be inserted */': 'src/temp/drop.min.js'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['min', 'ezra']);