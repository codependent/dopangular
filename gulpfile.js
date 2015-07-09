var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');

gulp.task('clean-css', require('del').bind(null, ['./public/css']));

gulp.task('clean-js', require('del').bind(null, ['./public/css']));

gulp.task('clean', ['clean-css','clean-js']);

gulp.task('sass', ['clean-css'], function () {
  gulp.src('./resources/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('compress-js', function() {
  return gulp.src('./resources/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});
 
gulp.task('build', ['sass','compress-js']);

gulp.task('default', ['build'], function(){
    livereload.listen();
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
    gulp.watch('./resources/js/**/*.js', ['compress-js']);
    require("./bin/www");
});