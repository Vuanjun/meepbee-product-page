var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['nodemon']);

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ignore: ['./public/js/**'],
    nodeArgs: ['--harmony']
  })
});

