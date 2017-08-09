const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('copy:fonts', () =>
  gulp
  .src(['node_modules/font-awesome/fonts/*',
    'node_modules/bootstrap/dist/fonts/*'
    ])
  .pipe(gulp.dest('dist/fonts'))
);

gulp.task('copy:html', () =>
  gulp
  .src('client/**/*.html')
  .pipe(gulp.dest('dist'))
);

gulp.task('build:js', () =>
  gulp
  .src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-material/angular-material.js',
    'node_modules/angular-material-icons/angular-material-icons.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'client/**/*.module.js',
    'client/**/*.js'
  ])
  .pipe($.concat('bundle.min.js'))
  .pipe($.uglify().on('error', (err) => {
    console.log(`Error: ${err}`);
  }))
  .pipe(gulp.dest('dist/js'))
);

gulp.task('build:css', () =>
  gulp
  .src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/angular-material/angular-material.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'client/**/*.css'
  ])
  .pipe($.concat('bundle.min.css'))
  .pipe($.cleanCss())
  .pipe(gulp.dest('./dist/css'))
);

gulp.task('watch', () => {
  gulp.watch('./client/**/*.css', ['build:css']);
  gulp.watch('./client/**/*.js', ['build:js']);
  gulp.watch('./client/**/*.html', ['copy:html']);
});

gulp.task('serve', () =>
  $.nodemon({
    script: 'index.js',
    env: {
      NODE_ENV: 'development'
    }
  })
);

gulp.task('default', ['copy:fonts', 'copy:html', 'build:js', 'build:css', 'watch', 'serve']);
