var pkg = require('./package.json');
var files = require('./file-order.json');

var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsdoc = require('gulp-jsdoc');
var fs = require('fs');

gulp.task('concat', function () {
    return gulp.src(files.paths)
        .pipe(concat(pkg.name + '.js'))
        .pipe(header(fs.readFileSync('version-banner.txt', 'utf8'), {pkg: pkg, now: new Date().toUTCString()}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uglify', ['concat'], function () {
    return gulp.src('./dist/' + pkg.name + '.js')
        .pipe(uglify())
        .pipe(header(fs.readFileSync('version-banner.txt', 'utf8'), {pkg: pkg, now: new Date().toUTCString()}))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('jsdoc', ['concat'], function () {
    return gulp.src('./dist/' + pkg.name + '.js')
        .pipe(jsdoc('./docs'))
});

gulp.task('default', ['uglify', 'jsdoc']);