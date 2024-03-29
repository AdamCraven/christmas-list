var gulp = require('gulp');  //This tells node to look into node_modules folder for the package gulp, when it is found, it is assigned to the variable
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	gulp.src('./app/styles/*.scss') //I think that this locates the sass file to change
  	.pipe(sass()) //This uses gulp-sass and converts it to CSS
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
  	.pipe(gulp.dest('./app/styles')); // This places it in the app folder (maybe I shoud create a CSS folder)
});

gulp.task('watch', ['sass'], function() {
	return gulp.watch('app/styles/**/*.scss', ['sass']);
});
