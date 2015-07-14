var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var argv = require('yargs').argv;
var isDevelopment = (argv.development === undefined) ? false : true;

gulp.task('clean-css', function(){
 del.sync(['./public/css']);
});

/*
gulp.task('clean-css', function(cb){
  del(['./public/css'], function(err, paths){
    cb();
  });
});*/

gulp.task('clean-js', del.bind(null, ['./public/js']));

gulp.task('clean', ['clean-css','clean-js']);

gulp.task('sass', ['clean-css'], function () {
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

gulp.task('compress-js', ['clean-js'], function() {
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
 
gulp.task('build', ['sass','compress-js']);

gulp.task('default', ['build'], function(){
    plugins.livereload.listen();
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
    gulp.watch('./resources/js/**/*.js', ['compress-js']);
    require("./bin/www");
});