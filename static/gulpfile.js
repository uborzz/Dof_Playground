var gulp = require('gulp'),
 minifyCSS = require('gulp-minify-css'),
 concatCss = require('gulp-concat-css'),
 concatJs = require('gulp-concat'),
 notify = require('gulp-notify'),
 uglify = require('gulp-uglify');

gulp.task('css', function ()
{
  gulp.src('*.css')
    .pipe(concatCss("todo.css"))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('out/css'))
    .pipe(notify("Ha finalizado la task css!"));
});

gulp.task('js', function()
{
  gulp.src('app/**/*.js')
    .pipe(concatJs('concat.js'))
    .pipe(uglify())
    .pipe(gulp.dest('out/js'))
    .pipe(notify("Ha finalizado la task js!"));
});



//
//
//var jshint = require('gulp-jshint');
//var gulp   = require('gulp');
//






// gulp.task('default', function() {
//   return gulp.src('./lib/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });


// gulp.task('lint', function() {
//   return gulp.src('./app/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });
