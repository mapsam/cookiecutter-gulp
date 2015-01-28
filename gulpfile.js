var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    browserSync    = require('browser-sync'),
    bower   = require('gulp-bower');


var src = './src';
var dest = './dest';
var config = {
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/static/css',
    options: {
      outputStyle: 'compressed'
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
    src: './bower_components/**/'
  },
  markup: {
    src: src + '/htdocs/**',
    dest: dest
  }
}


gulp.task('default', ['vendor', 'sass', 'uglify', 'markup', 'browser-sync']);

gulp.task('vendor', ['bower'], function() {
  return gulp.src(mainBowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/static/js'));
});

gulp.task('sass', function () {
  gulp.src(src)
    .pipe(sass(config.sass.options))
    .pipe(gulp.dest(dest));
});

gulp.task('uglify', function () {
  gulp.src(config.uglify.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.uglify.dest))
});

gulp.task('markup', function() {
  return gulp.src(config.markup.src)
    .pipe(gulp.dest(config.markup.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dest"
        }
    });
});

gulp.task('bower', function(cb){
  return bower();
});

gulp.task('js', ['lint', 'uglify']);