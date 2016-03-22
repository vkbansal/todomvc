"use strict";

let gulp = require("gulp"),
    rename = require("gulp-rename"),
    nunjucksRender = require("gulp-nunjucks-render");

gulp.task("default", ["todocss", "html"]);

gulp.task("todocss", () => {
    gulp.src("./node_modules/todomvc-app-css/index.css")
        .pipe(rename({
            basename: "todo"
        }))
        .pipe(gulp.dest("./public/css"));
});

gulp.task("html", () => {
    gulp.src("./examples/**/*.njk")
        .pipe(nunjucksRender({
            path: ["./templates"]
        }))
        .pipe(gulp.dest("./public"));
});
