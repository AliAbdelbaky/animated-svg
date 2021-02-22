const { dest } = require("gulp");
const GulpClient = require("gulp");
const gulp = require("gulp"),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemap = require('gulp-sourcemaps'),
    minify = require('gulp-minify'),
    notify = require('gulp-notify');
//- HTML TASK
gulp.task('Html', () => {
    return gulp.src('./stage/html/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('./dist'))
        .pipe(notify('You Html Is Ready!'))
});
//- CSS TASK
gulp.task('Css', () => {
    return gulp.src(['./stage/css/**/*.css', './stage/css/**/*.sass'])
        .pipe(sourcemap.init())
        .pipe(sass({
            outputStyle: "compressed"
        })).on('error', sass.logError)
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemap.write('./css-maps'))
        .pipe(concat('main.css'))
        .pipe(dest('./dist/css'))
        .pipe(notify('Your Css Is Ready!'))
});
//- JS TASK
gulp.task('js', () => {
    return gulp.src(['./stage/js/libs/*.js', './stage/js/app/*.js'])
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(dest('./stage/js/all'))
        .pipe(notify('Your Js Is Ready!'))
});
//- JS RELOCATE
gulp.task('js-relocate', () => {
    return gulp.src('./stage/js/all/*.js')
        .pipe(dest('./dist/js'))
        .pipe(notify('Js Relocated Successfully'))
});
//- ASSETS TASK
gulp.task('assets', () => {
    return gulp.src('./stage/assets/*.*')
        .pipe(dest('./dist/img'))
        .pipe(notify('Your Images Is Ready!'))
});
//- WATCH TASK
gulp.task('watch', () => {
    gulp.watch('./stage/html/**/*.pug', gulp.series('Html'));
    gulp.watch(['./stage/css/**/*.css', './stage/css/**/*.sass'], gulp.series('Css'));
    gulp.watch(['./stage/js/libs/*.js', './stage/js/app/*.js'], gulp.series('js'));
    gulp.watch('./stage/js/all/*.js', gulp.series('js-relocate'));
    gulp.watch('./stage/assets/*.*', gulp.series('assets'));
});