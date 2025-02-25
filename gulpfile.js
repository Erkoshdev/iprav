const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/img/**/*')
      .pipe(imagemin(
          [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.svgo({
              plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
              ]
            })
          ]
      ))
      .pipe(dest('dist/img'))
}

function icons() {
    return src('app/icon/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))
        .pipe(dest('dist/icon'))
}

function libsJs() {
  return src([
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/toastify-js/src/toastify.js'
  ])
      .pipe(concat('libs.min.js'))
      .pipe(dest('app/js'))
}

function libsCss() {
  return src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/swiper/swiper-bundle.min.css',
      'node_modules/toastify-js/src/toastify.css'
  ])
      .pipe(concat('libs.min.css'))
      .pipe(dest('app/css'))
}

function styles() {
  return src('app/scss/style.scss')
      .pipe(scss({outputStyle: 'compressed'}))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(concat('style.min.css'))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

function build() {
  return src([
      'app/css/**/*.css',
      'app/fonts/**/*',
      'app/js/**/*.js',
      'app/*.html',
  ], {base: 'app'})
      .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/main.js']).on('change', browserSync.reload);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, icons, build);
exports.default = parallel(styles, browsersync, watching, libsJs, libsCss);