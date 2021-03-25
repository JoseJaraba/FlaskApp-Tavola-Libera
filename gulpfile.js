const { src, dest, task, series } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
sass.compiler = require('dart-sass');


task('clean', function() {
    return del(['./js/main.min.js', './css/main.min.css', './css/main.min.css.map', './www']);
});

task('js', function() {
    return src("./js/**/*.js")
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("./js"));
});

task('css', function() {
    return src("./sass/**/*.scss")
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(dest("./css"));

});

task('build_assets', function() {
    let items_to_move = [
        "./index.html",
        "./img/**",
        "./css/**",
        "./js/**"
    ]

    return src(items_to_move, { base: './' })
        .pipe(dest('./www'));
});

task('build', series('clean', 'js', 'css', 'build_assets'));
task('dev', series('clean', 'js', 'css'));