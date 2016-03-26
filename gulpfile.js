"use strict";

let gulp = require("gulp"),
    path = require("path"),
    data = require("gulp-data"),
    sass = require("gulp-sass"),
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

gulp.task("styles", () => {
    gulp.src("./assets/scss/base.scss")
        .pipe(sass({
            includePaths: ["./node_modules/materialize-css/sass"]
        }).on("error", sass.logError))
        .pipe(gulp.dest("./public/css"));
});

gulp.task("styles:watch", ["styles"], () => {
    gulp.watch("./assets/**/*.scss", ["styles"]);
});

gulp.task("html", () => {
    gulp.src("./examples/**/*.njk")
        .pipe(data((file) => ({
            dir: path.dirname(file.relative)
        })))
        .pipe(nunjucksRender({
            path: ["./assets/templates"]
        }))
        .pipe(gulp.dest("./public"));
});
