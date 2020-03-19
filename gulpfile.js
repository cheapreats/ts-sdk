const gulp = require("gulp");
// const ts = require("gulp-typescript");
// const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const babel = require("babelify");

gulp.task("build", function() {
  const bundler = browserify("./index.js", { debug: true }).transform(babel);

  return bundler
    .bundle()
    .on("error", function(err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("ce.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build"));
});
gulp.task("default", ["build"]);

// gulp.task('default', function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest('dist'));
// });
