var gulp            = require('gulp'),
    uglify          = require('gulp-uglify'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    mainBowerFiles  = require('main-bower-files'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    bower           = require('gulp-bower'),
    watch           = require('gulp-watch');


var src = './src';
var dest = './{{cookiecutter.app_name}}';
var config = {
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/static/css',
    options: {
      outputStyle: 'compressed',
      errLogToConsole: true
    }
  },
  bower: {
    dest: dest + '/static/lib'
  },
  uglify: {
    src: src + '/js/*.js',
    dest: dest + '/static/js',
    options: {}
  },
  vendor: {
    src: './bower_components/**/',
    dest: dest + '/static/js'
  },
  markup: {
    src: src + '/htdocs/**',
    dest: dest
  },
  bsync: {
    server: dest,
    watch: dest + '/static/**/**.*'
  }
};



/*
**
** DEFAULT
**
*/
gulp.task('default', ['markup', 'vendor', 'sass', 'uglify', 'browser-sync'], function(){
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.uglify.src, ['uglify']);
  gulp.watch(config.markup.src, ['markup']);
});


/*
**
** VENODR
**
*/
gulp.task('vendor', ['bower'], function() {
  return gulp.src(mainBowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.vendor.dest));
});


/*
**
** SASS (watcher & builder)
**
*/
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sass(config.sass.options))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(reload({stream:true}));
});


/*
**
** UGLIFY
**
*/
gulp.task('uglify', function () {
  gulp.src(config.uglify.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.uglify.dest))
});


/*
**
** MARKUP
**
*/
gulp.task('markup', function() {
  return gulp.src(config.markup.src)
    .pipe(gulp.dest(config.markup.dest))
    .pipe(browserSync.reload({stream:true}));
});


/*
**
** BROWSER-SYNC
**
*/
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: dest
        },
        files: config.bsync.watch
    });
});


/*
**
** BOWER
**
*/
gulp.task('bower', function(cb){
  return bower();
});


/*
**
** JS
**
*/
gulp.task('js', ['lint', 'uglify']);