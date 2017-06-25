var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	browserSync = require('browser-sync'),
	del = require('del'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');

// Load plugins
var $ = require('gulp-load-plugins')();


gulp.task('less', function () {
	return gulp.src('app/less/style.less')
		.pipe(less().on('error', function(err) {
			console.log('less error: ',err);
		}))
		// .pipe(cssmin().on('error', function(err) {
		// 	console.log(err);
		// }))
		// .pipe(rename({
		// 	suffix: '.min'
		// }))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('scripts', function () {
	return gulp.src(['./app/*.js', './app/*/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/'));
});


gulp.task('watch', ['less', 'browserSync'], function () {
	gulp.watch('app/**/*.less', ['less']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/*.js', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
});


gulp.task('browserSync', function () {
	browserSync({
		browser: ["chrome"],
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('fonts', function() {
	return gulp.src([
		'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
		.pipe(gulp.dest('app/assets/fonts/'));
});


gulp.task('clean', function () {
	del('dist');
});

gulp.task('build', ['clean', 'fonts', 'less', 'scripts', 'watch'], function () {
	console.log('*- Yay! -* Building files');
});

