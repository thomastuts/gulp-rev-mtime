var gulp = require('gulp');
var rev = require('./index');

gulp.task('test', function () {
  gulp.src('test/**/*.html')
    .pipe(rev({
      cwd: 'test'
    }))
    .pipe(gulp.dest('out'));
});
