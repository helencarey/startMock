var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

var target = './docs/';

// gulp.task('js', function() {
//   gulp.src(target + '*.js');
// });
//
// gulp.task('html', function() {
//   gulp.src(target + '*.html');
// });
//
// gulp.task('css', function() {
//   gulp.src(target + 'css/*.css');
// });

gulp.task('sass', function() {
    return gulp.src(target + '*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest(target + '/css/'));
  });

gulp.task('watch', function() {
  gulp.watch(target + '*', ['sass']);
  gulp.watch(target + 'common-styles/*', ['sass']);
  gulp.watch(target + '**/*', ['sass']); // ???
  //gulp.watch(target + 'js/**/*', ['js']);
  //gulp.watch([target + '*.html', target + 'views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src(target)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'sass', 'webserver']);
