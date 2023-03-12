const {src,dest,watch, series} = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("sourcemaps");
const cssnano = require("cssnano");

// Imagenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(){
    return src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"));
}
function versionWebp(done){
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp())
        .pipe(dest("build/img"));
}
function versionAvif(done){
    const opciones = {
        quality: 50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"));
}
function imagenes(done){
    return src("src/img/**/*")
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest("build/img"));
}

function dev(){
    watch("src/scss/**/*.scss",css);
    watch("src/img/**/*",imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes,versionWebp,versionAvif,css,dev);