

'use strict'
/**
* 1.less编译、压缩、合并
* 2.JS合并、压缩、混淆
* 3.img复制
* 4.HTML压缩
*/

// 在gulpfile中引入gulp包，这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');

// 1.less编译、压缩、合并(建议一般预处理CSS都可以导包)
gulp.task('style', function(){
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles/'));

	browserSync.reload("dist/*.html");
})

var uglify = require('gulp-uglify');
var pump = require('pump');

// 2.JS合并、压缩混淆 (一定先合并再混淆)
gulp.task('js', function(){
	pump([
        gulp.src('src/scripts/*.js'),
        concat('all.js'),
        uglify(),
        gulp.dest('dist/scripts')
    ]);

    browserSync.reload("dist/*.html");
})

//3. 复制图片
gulp.task('images', function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'));

	browserSync.reload("dist/*.html");
})

//4.压缩html
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(htmlmin({removeComments: true}))
		.pipe(gulp.dest('dist'));

	browserSync.reload("dist/*.html");
});

// 5.搭建自动化测试环境：多终端、多浏览器
var browserSync = require('browser-sync').create();
gulp.task('serv', function(){
	browserSync.init({
    	server: "dist"
	});

	gulp.watch('src/styles/*.less', ['style'])
	gulp.watch('src/images/*.*', ['images'])
	gulp.watch('src/scripts/*.js', ['js'])
	gulp.watch('src/*.html', ['html'])
})







