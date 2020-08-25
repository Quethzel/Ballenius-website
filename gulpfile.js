const { src, dest, series, parallel }  = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const htmlReplace = require('gulp-html-replace');
const del = require('del');

function cleanPublicFolder() {
    return del(['public/*']);
}

function minifyJs() {
    return src(['js/jquery.maskedinput.min', 'js/script.js'], { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(dest('public/js'))
}

function minifyCss() {
    return src(['css/framework.css', 'css/style.css', 'css/custom.css', 'css/404.css'], {allowEmpty: true })
    .pipe(concat('stylesheet.css'))
    .pipe(cleanCss())
    .pipe(dest('public/css'))
}

function copyAssets() {
    return src('assets/*')
    .pipe(dest('public/assets'));
}

function copyHtml() {
    return src('*.html')
    .pipe(dest('public'));
}

function replaceIndexRef() {
    return src('index.html')
    .pipe(htmlReplace({
        'css': 'css/stylesheet.css',
        'js': 'js/script-min.js'
    }))
    .pipe(dest('public'));
}

function replaceRef404() {
    return src('404-page.html')
    .pipe(htmlReplace({
        'css': 'css/stylesheet.css',
    }))
    .pipe(dest('public'));
}

exports.default = series(
    cleanPublicFolder,
    parallel(
        copyAssets,
        minifyCss,
        minifyJs,
        copyHtml
    ),
    replaceIndexRef,
    replaceRef404
)
