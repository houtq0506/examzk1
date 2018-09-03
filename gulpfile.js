var gulp = require('gulp');
var scss = require('gulp-sass');
var minCss = require('gulp-clean-css')
var minJs = require('gulp-uglify')

var server = require('gulp-webserver')

//gulp实现css压缩和js压缩
gulp.task('sassTask', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(scss())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

//gulp实现js压缩
gulp.task('ugly', function() {
    return gulp.src('./src/js/*.js')
        .pipe(minJs())
        .pipe(gulp.dest('build'))
})

//起服务
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8989,
            middleware: function(req, res, next) {

            }
        }))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('sassTask'))
})

//合并任务
gulp.task('dev', gulp.series('sassTask', 'ugly', 'watch'))