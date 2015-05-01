var gulp    = require('gulp'),
    lr      = require('gulp-livereload'),
    notify  = require('gulp-notify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    stream = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    Express = require("express"),
    app = new Express();

var handleErrors = function(){
    var args = Array.prototype.slice.call(arguments);

    //Send error to notification center with gulp-Notify
    notify.onError({
        title: arguments[0].plugin,
        message: "<%= error.message %>"
    }).apply(this, args);

    //Keep gulp from hanging on this task
    this.emit('end');
};

var browserifyTask = function (options) {
    var appBundler = browserify({
        entries: [options.src],
        transform: [babelify],
        debug: options.development,
        cache:{},
        packageCache:{},
        fullPaths:true
    });

    var rebundle = function () {
        appBundler.bundle()
            .on('error', handleErrors)
            .pipe(stream(options.name))
            .pipe(gulp.dest(options.dest))
            .pipe(streamify(uglify()))
            .pipe(rename({suffix:'.min'}))
            .pipe(gulp.dest(options.dest))
            .pipe(lr({auto:false}))
            .pipe(notify("Bundled"));
    };

    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();
};

gulp.task('lint',function(){
    return gulp.src('src/**/*.js')
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.format());
});

gulp.task('default', function(){
    lr.listen();
    
    browserifyTask({
        development: true,
        src: './src/app.js',
        dest: './dist/',
        name: 'app.js'
    });
    
    app.use(Express.static(__dirname));
    app.listen(8000, 'localhost');
    console.log("Server started at http://localhost:8000");
    
});
