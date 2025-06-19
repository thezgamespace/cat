var gulp = require('gulp');

const zip = require('gulp-zip');
var del = require('del');
var fileInline = require("gulp-file-inline");
var javascriptObfuscator = require("gulp-javascript-obfuscator");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var rootDir = '../';
var projectName = __dirname.split('\\').reverse()[0];

gulp.src('src/*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('dist'))

var filelist = [
    "./build/web-mobile/**/*"
]
gulp.task('zip', () => {
    return gulp.src(filelist).pipe(zip(projectName+'.zip')).pipe(gulp.dest("./" ))
})
gulp.task('copy', () => {
    return gulp.src(filelist).pipe(gulp.dest("./" + projectName))
})

gulp.task('delete', () => {
    return del("./" + projectName)
})

gulp.task("imagemin", function (cb) {
    gulp.src(["./build/web-mobile/**/*.png"])
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest("./build/web-mobile/"))
        .on("end", cb);
});

gulp.task("htmlmin", gulp.series("imagemin", function (cb) {
    gulp.src("./build/web-mobile/*.html")
        .pipe(fileInline())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest("./build/web-mobile/")
            .on("end", cb));
}));


gulp.task("obfuscator", gulp.series("htmlmin", function (cb) {
    gulp.src(["./build/web-mobile/assets/main/index.*.js"])
        .pipe(javascriptObfuscator({
            compact: true,
            domainLock: [],
            mangle: true,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            target: "browser"
        }))
        .pipe(gulp.dest("./build/web-mobile/assets/main/")
            .on("end", cb));
}));