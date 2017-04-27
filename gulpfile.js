const gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    nodemon = require("gulp-nodemon"),
    refresh = require("gulp-refresh"),
    runSequence = require("run-sequence");;

const sourceDir = "./src";
const testDir = "./test";

gulp.task("jshint", function () {
    return gulp.src([sourceDir+"/*.js", sourceDir+"/**/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("livereload", function () {
    nodemon({
        script: sourceDir/+"server.js",
        stdout: true
    });
});

gulp.task("watch", function() {
    refresh.listen();
    gulp.watch([sourceDir+"/*.js", sourceDir+"/**/*.js"], ["jshint"]).on('change', refresh.changed);
});

gulp.task("dev", function() {
    runSequence(
        ["jshint"],
        ["livereload"],
        ["watch"]
    );
});