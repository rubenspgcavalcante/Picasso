var pkg = require('./package.json');
var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsdoc = require('gulp-jsdoc');
var fs = require('fs');

gulp.task('concat', function () {
    return gulp.src([
        "src/defines.js",
        "src/system/load.js",
        "src/system/extend.js",
        "src/system/pjo/event/*.js",
        "src/system/pjo/form/*.js",
        "src/system/error/*.js",
        "src/utils/*.js",
        "src/system/core/*.js",
        "src/system/mvc/*.js",
        "src/system/form/validators/*.js",
        "src/system/form/fields/PicassoField.js",
        "src/system/form/fields/*.js",
        "src/system/form/*.js",

        // All the default fields
        "src/system/form/fields/PicassoField.js",
        "src/system/form/fields/*"
    ])
        .pipe(concat(pkg.name + '.js'))
        .pipe(header(fs.readFileSync('version-banner.txt', 'utf8'), {pkg: pkg, now: new Date().toUTCString()}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uglify', ['concat'], function () {
    return gulp.src('./dist/' + pkg.name + '.js')
        .pipe(uglify())
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('jsdoc', ['concat'], function () {
    return gulp.src('./dist/' + pkg.name + '.js')
        .pipe(jsdoc('./docs'))
});

gulp.task('default', ['uglify', 'jsdoc']);