var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

var reload = browserSync.reload;

const SRC_PATH = {
  // scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  scss: "./assets/src/scss/**/*.scss",
  // images: 'client/img/**/*'
};

const DIST_PATH = {
  // scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  css: "./assets/dist/styles",
  // images: 'client/img/**/*'
};

gulp.task("styles", function () {
  console.log("styles task is running");
  return gulp
    .src(SRC_PATH.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(DIST_PATH.css));
});

gulp.task("autoprefix-css", () => {
  console.log("auto-prefixed");

  gulp
    .src("./assets/dist/styles/*css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest(DIST_PATH.css));
});

// Rerun the task when a file changes
gulp.task("watch", function () {
  console.log("watch is running");

  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("*.html").on("change", reload);
  gulp.watch(SRC_PATH.scss, gulp.series(["styles", "autoprefix-css"]));
  // gulp.watch(paths.images, ['images']);
});
