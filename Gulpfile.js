var gulp = require('gulp');
var rev = require('./index');

gulp.task('test', function () {
  gulp.src('examples/in.html')
    .pipe(rev({
      cwd: 'examples'
    }));
});
