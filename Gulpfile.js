var gulp = require('gulp');
var rev = require('./index');

gulp.task('test', function () {
  gulp.src('test/example.html')
    .pipe(rev({
      cwd: 'test'
    }))
    .pipe(gulp.dest('out'));
});
