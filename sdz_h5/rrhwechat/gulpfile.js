var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var gulpSequence = require('gulp-sequence');
var c = require('child_process');


var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var paths = {
  pages: ['./www/templates/*/index.html'],
  pagectrls: ['./www/templates/*/index.js'],
  concatlibjs: ['./www/lib/loadash/*.min.js', './www/lib/ionic/js/ionic.bundle.min.js', './www/lib/mobiscroll/mobiscroll.angular.min.js', './www/lib/ngclipboard/dist/clipboard.min.js', './www/lib/ngclipboard/dist/ngclipboard.min.js'],
  concatjs: ['./www/js/*.js'],
  bundlejs: ['./rrhwechat/bundle.js'],
  bundlelibjs: ['./rrhwechat/bundlelib.js'],
  bundlecss: ['./rrhwechat/bundle.css'],
  reloadcss: ['./rrhwechat/*.css'],
  reloadjs: ['./rrhwechat/*.js'],
  sass: ['./scss/**/*.scss', './www/templates/**/index.scss'],
};
gulp.task('sass', function (done) {
  gulp.src('./scss/bundle.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./rrhwechat'))
    .on('end', done);
});
gulp.task('sassfinish', function (done) {
  gulp.src('./scss/bundle.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(rev())//自动版本号
    .pipe(gulp.dest('./rrhwechat'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rrhwechat/rev/css'))
    .on('end', done);
});
gulp.task('ngtemplate', function () {
  return gulp.src(paths.pages)
    .pipe(templateCache('pages.js', { module: 'app', root: 'templates/' }))
    .pipe(gulp.dest('./www/js'));
});
gulp.task('ngctrl', function () {
  return gulp.src(paths.pagectrls)
    .pipe(concat('ctrls.js'))
    .pipe(gulp.dest('./www/js'));
});
gulp.task('concatjs', function () {
  return gulp.src(paths.concatjs)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./rrhwechat'))
});

gulp.task('concatjsfinish', function () {
  return gulp.src(paths.concatjs)
    .pipe(concat('bundle.js'))
    .pipe(rev())//自动版本号
    .pipe(gulp.dest('./rrhwechat'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rrhwechat/rev/js'))
});
gulp.task('concatlibjs', function () {
  return gulp.src(paths.concatlibjs)
    .pipe(concat('bundlelib.js'))
    .pipe(gulp.dest('./rrhwechat/'));
});


gulp.task('concatlibjsfinish', function () {
  return gulp.src(paths.concatlibjs)
    .pipe(concat('bundlelib.js'))
    .pipe(rev())//自动版本号
    .pipe(gulp.dest('./rrhwechat'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rrhwechat/rev/libjs'))
});



gulp.task('connect', function () {
  connect.server({
    root: 'rrhwechat',
    port: 7777,
    livereload: {
      port: 7778
    }
  });
});
gulp.task('reload', function () {
  console.log('reload')
  console.log(arguments)
  gulp.src('./rrhwechat/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(paths.pages, ['ngtemplate']);
  gulp.watch(paths.pagectrls, ['ngctrl']);
  gulp.watch(paths.concatjs, ['concatjs']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.reloadcss, ['reload']);
  gulp.watch(paths.reloadjs, ['reload']);
});


gulp.task('rev', function () {
  return gulp.src(['./rrhwechat/rev/**/*.json', './rrhwechat/index.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('./rrhwechat'));
});


gulp.task('clean', function () {
  return gulp.src(['./rrhwechat/*.js', './rrhwechat/*.css'], { read: false })
    .pipe(clean());
});

gulp.task('serve', gulpSequence('clean', ['sass', 'ngtemplate', 'ngctrl', 'concatlibjs'], 'concatjs', 'connect', 'watch'))
gulp.task('release', gulpSequence('clean', ['sassfinish', 'ngtemplate', 'ngctrl', 'concatlibjsfinish'], 'concatjsfinish', 'rev'))