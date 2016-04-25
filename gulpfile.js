var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var typescript = require('gulp-tsc');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var del = require('del');
var karmaServer = require('karma').server;
var argv = require('yargs').argv;
var isDevelopment = (argv.development === undefined) ? false : true;

gulp.task('serve', ['default'], function(){
    plugins.livereload.listen();
    gulp.watch('./lib/resources/sass/**/*.scss', ['sass']);
    gulp.watch('./lib/resources/js/**/*.js', ['compress-js']);
    gulp.watch('./lib/resources/polymer/**/*.html', ['polymer']);
    gulp.watch('./lib/resources/app/**/*.ts', ['compile-ts']);
    require("./bin/www");
});

gulp.task('jshint', function () {
  return gulp.src('./lib/resources/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('sass', function () {
  var stream = gulp.src('./lib/resources/sass/**/*.scss')
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
  var stream = gulp.src('./lib/resources/js/**/*.js')
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

gulp.task('polymer', function() {
  return gulp.src('./lib/resources/polymer/**/*.html')
    .pipe(gulp.dest('./public/polymer'))
    .pipe(plugins.livereload());
});

gulp.task('compile-ts', function(){
  return gulp.src(['./lib/resources/app/**/*.ts'])
    .pipe(typescript({"target": "es5", "module": "system", "moduleResolution": "node", "sourceMap": true,
                      "experimentalDecorators": true, "emitDecoraasdftorMetadata": true, "removeComments": false,
                      "noImplicitAny": false, "sourceRoot": ""}))
    .pipe(gulp.dest('./public/app/'))
    .pipe(plugins.livereload());
});

gulp.task('compile-typescript', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src([
        './lib/resources/app/**/*.ts',
    ])        
        .pipe(plugins.sourcemaps.init())
        .pipe(ts(tsProject))
    return tsResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./public/app/'));
});

 
gulp.task('build', ['jshint','compress-js','compile-typescript','polymer','sass']);

/*
gulp.task('clean-css', function(cb){
  del(['./public/css'], function(err, paths){
    cb();
  });
});*/

gulp.task('clean-css', function(){
 del.sync(['./public/css']);
});

gulp.task('clean-polymer', function(cb){
 del(['./public/polymer'], cb);
});

gulp.task('clean-ts', function(cb){
 del(['./public/app'], cb);
});

gulp.task('clean-js', del.bind(null, ['./public/js']));

gulp.task('clean', ['clean-css','clean-js','clean-ts','clean-polymer']);

gulp.task('install', function(){
  return gulp.src(['./bower.json', './package.json'])
     .pipe(plugins.install());
});

gulp.task('test', function (cb) {
  console.log(karmaServer);
  new karmaServer.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, cb);
});

gulp.task('default', function(cb){
  runSequence('clean','build',cb);
});