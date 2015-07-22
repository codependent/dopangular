var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

gulp.task('serve', ['default','build'], function(){
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

gulp.task('sass', function (cb) {
  gulp.src('./resources/sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
    .pipe(plugins.rename({extname: '.min.css'}))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(plugins.gzip({ append: true }))
    .pipe(gulp.dest('./public/css'))
    .pipe(plugins.livereload())
    .on('end', function() {
        postProcessMapFiles('./public/css/maps/**/*.map.gz', './public/css/maps', cb);
    });
});

gulp.task('compress-js', function(cb) {
  gulp.src('./resources/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({extname: '.min.js'}))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(plugins.gzip({ append: true }))
    .pipe(gulp.dest('./public/js'))
    .pipe(plugins.livereload())
    .on('end', function() {
        postProcessMapFiles('./public/js/maps/**/*.map.gz', './public/js/maps', cb);
    });
    ;
});

function postProcessMapFiles(compressedMapFiles, publicDir, cb){
    gulp.src(compressedMapFiles)
       .pipe(plugins.debug())
       .pipe(plugins.rename({extname: ''}))
       .pipe(plugins.debug())
       .pipe(gulp.dest(publicDir))
       .on('end', function() {
          del([compressedMapFiles], cb);
       });
}

 
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

gulp.task('default', ['clean'], function(){
    gulp.start('build');
});