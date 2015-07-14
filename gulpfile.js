var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var del = require('del');
var argv = require('yargs').argv;
var isDevelopment = (argv.development === undefined) ? false : true;

gulp.task('serve', ['default'], function(){
    plugins.livereload.listen();
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
    gulp.watch('./resources/js/**/*.js', ['compress-js']);
    require("./bin/www");
});

gulp.task('jshint', function () {
  return gulp.src('./resources/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('sass', function () {
  var stream = gulp.src('./resources/sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
    .pipe(plugins.rename({extname: '.min.css'}))
    .pipe(plugins.sourcemaps.write('./maps'));
  if(!isDevelopment){
        stream = stream.pipe(plugins.gzip({ append: false }))
    }
    stream.pipe(gulp.dest('./public/css'))
    stream.pipe(plugins.livereload());
    return stream;
});

gulp.task('compress-js', function() {
  var stream = gulp.src('./resources/js/**/*.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({extname: '.min.js'}))
    .pipe(plugins.sourcemaps.write('./maps'))
  if(!isDevelopment){
    stream.pipe(plugins.gzip({ append: false }))
  }
  stream.pipe(gulp.dest('./public/js'))
  stream.pipe(plugins.livereload());
  return stream;
});
 
gulp.task('build', ['jshint','compress-js','sass']);

/*
gulp.task('clean-css', function(cb){
  del(['./public/css'], function(err, paths){
    cb();
  });
});*/

gulp.task('clean-css', function(){
 del.sync(['./public/css']);
});

gulp.task('clean-js', del.bind(null, ['./public/js']));

gulp.task('clean', ['clean-css','clean-js']);

gulp.task('default', function(cb){
  runSequence('clean','build',cb);
});