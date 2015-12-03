var gulp = require('gulp');  //This tells node to look into node_modules folder for the package gulp, when it is found, it is assigned to the variable

gulp.task('hello', function() {
	console.log('Hello Andrew');  //I used this as a test to see if my gulpfile was working.. it was!!
});

var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('app/sass/christmasStyle.scss') //I think that this locates the sass file to change
	.pipe(sass()) //This uses gulp-sass and converts it to CSS
	.pipe(gulp.dest('app')) // This places it in the app folder (maybe I shoud create a CSS folder)	
});

gulp.task('watch', function() {
	gulp.watch('src/app/scss/christmasStyle.scss', ['sass']);
});