var postcss = require('gulp-postcss'),
    gulp = require('gulp'),
    cache = require('gulp-cache'),
    copy = require('gulp-contrib-copy'),
    cssnano = require('cssnano'),
    cssnext = require('postcss-cssnext'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');

gulp.task('css', function () {
    return (
    gulp.src('./src/css/*.css')
    .pipe(postcss([
      require("postcss-import")(),
      require("postcss-url")(),
      require("postcss-cssnext")(),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(postcss([
      require("cssnano")(),
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({ message: 'css task complete!' })))
});

gulp.task('copy', function() {
    gulp.src('src/*')
		.pipe(copy())
	  .pipe(gulp.dest('dist/'))
});

gulp.task('clean', function() {
    return del(['dist/*']);
    gulp.src('src/*')
		.pipe(copy())
	  .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.css', ['css']);
});

gulp.task('default', ['clean','copy'], function() {
    gulp.start('css');
});
