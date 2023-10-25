const {src, dest, series} = require('gulp');
const download = require("gulp-download-stream");
const unzip = require('gulp-unzip');
const streamify = require('gulp-streamify');

const srcDir = '${webjar.staging}/jQuery.print-${version.unrevise}/';
const destDir = '${webjar.target}/';

function task1() {
    return download(`https://codeload.github.com/DoersGuild/jQuery.print/zip/refs/tags/${version.unrevise}`)
        .pipe(streamify(unzip()))
        .pipe(dest('./'));
}

function task2() {
    return _copy(['LICENSE', '*.md']);
}

function task3() {
    return _copy('jQuery.print*.js', 'dist');
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _copy(_src, _dest) {
    console.log('  Copying ' + _src);
    return _toSrc(_src).pipe(_toDest(_dest))
}

exports.default = series(task1, task2, task3);
