const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
sass.compiler = require('dart-sass');

function js() {
    return src("./js/**/*.js")
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("./js"));
}

function css(cb) {


    return src("./sass/**/*.scss")
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(dest("./css"));

}

exports.css = css;
exports.js = js;