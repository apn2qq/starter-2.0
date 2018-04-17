"use strict";

// Доделать гроуп медиа квери, имейджмин, свгмин, анксс, ксскомб -> в продакт папку

const browserSync = require("browser-sync"),
  gulp = require("gulp"),
  nunjucks = require("gulp-nunjucks-html"),
  plumber = require("gulp-plumber"),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin"),
  csscomb = require("gulp-csscomb"),
  uncss = require("gulp-uncss"),
  sourcemaps = require("gulp-sourcemaps");

// Nunjucks
gulp.task("nunjucks", () => {
  return gulp
    .src("src/*.html")
    .pipe(plumber())
    .pipe(
      nunjucks({
        searchPaths: ["src/blocks/"]
      })
    )
    .pipe(gulp.dest("build/"));
});

// Sass
gulp.task("sass", () => {
  return gulp
    .src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(autoprefixer(["last 2 versions"]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Js
gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(plumber())
    .pipe(gulp.dest("build/js/"));
});

// Images
gulp.task("images", () => {
  return gulp
    .src("src/img/**/*")
    .pipe(plumber())
    .pipe(gulp.dest("build/img"));
});

// Svg
gulp.task("svg", () => {
  return gulp
    .src("src/svg/**/*.svg")
    .pipe(plumber())
    .pipe(gulp.dest("build/svg"));
});

// Watch
gulp.task("watch", () => {
  gulp.watch("src/**/*.html", ["nunjucks"]);
  gulp.watch("src/**/*.scss", ["sass"]);
  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/img/**/*", ["images"]);
  gulp.watch("src/svg/**/*.svg", ["svg"]);
});

// Browsersync
gulp.task("browser-sync", () => {
  let files = [
    "build/**/*.html",
    "build/css/**/*.css",
    "build/js/**/*.js",
    "build/img/**/*",
    "build/svg/**/*.svg"
  ];

  browserSync({
    files: ["./build/**/*.*"],
    port: 8080,
    server: {
      baseDir: "./build/"
    },
    notify: false
  });
});

// default
gulp.task("default", [
  "nunjucks",
  "sass",
  "js",
  "images",
  "svg",
  "watch",
  "browser-sync"
]);

// super build

// gulp.task('uncss', function() {
//     return gulp.src('build/assets/css/style.css')
//         .pipe(uncss({
//             html: ['build/index.html'],
//             ignore: ['.visible', '.hidden']
//         }))
//         .pipe(gulp.dest('build/assets/css'));
// });

// gulp.task('imagemin', function() {
//     return gulp.src('build/assets/img/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('build/assets/img'));
// });

// gulp.task('csscomb', function() {
//     return gulp.src('build/assets/css/style.css')
//         .pipe(csscomb())
//         .pipe(gulp.dest('build/assets/css'));
// });

// gulp.task('super-build', [
//     'uncss',
//     'imagemin',
//     'csscomb'
// ]);
