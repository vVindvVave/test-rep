var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    del = require('del'),
    touch = require('gulp-touch-fd'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),

    sass = require('gulp-sass')(require('sass')),
    cssimport = require("gulp-cssimport"),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),

    webpackStream = require('webpack-stream'),
    { VueLoaderPlugin } = require("vue-loader"),
    TerserPlugin = require("terser-webpack-plugin"),

    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),

    fs = require('fs');

var build = false;
var watch = false;
var live = false;
var sourcesPath = './sources';
var assetsPath = './assets';

gulp.task('style', function(done) {

    function style(fileName) {
        var filePath = sourcesPath + '/style/'+fileName+'.scss';
        fs.access(filePath, function(err) {
            if (!err) {
                gulp.src(filePath)
                    .pipe(gulpif(!build, sourcemaps.init()))
                    .pipe(cssimport({
                        matchPattern: "*.css"
                    }))
                    .pipe(sass().on('error', sass.logError))
                    .pipe(autoprefixer())
                    .pipe(gulpif(build, cleanCSS({level: {1: {specialComments: 0}}})))
                    .pipe(gulpif(!build, sourcemaps.write('map')))
                    .pipe(gulp.dest(assetsPath))
                    .pipe(touch());
            }
        });
    }
    style('base');
    style('global');

    done();
});

gulp.task('js', function(done) {

    var mode = build ? 'production' : 'development';

    function script(fileName){
        var filePath = sourcesPath + '/js/'+fileName+'.js';
        fs.access(filePath, function(err){
            if (!err) {
                gulp.src(filePath)
                    .pipe(webpackStream({
                        mode: mode,
                        devtool: !build ? 'source-map' : false,
                        output: {
                            filename: fileName+'.js',
                            chunkFilename: fileName+'.[name].[contenthash].js',
                        },
                        module: {
                            rules: [
                                {
                                    test: /\.vue$/,
                                    loader: 'vue-loader',
                                    options: {
                                        presets: ['@vue/compiler-sfc']
                                    }
                                },
                                {
                                    test: /\.(scss|css)$/,
                                    use: [
                                        'vue-style-loader',
                                        'css-loader',
                                        {
                                            loader: 'sass-loader',
                                            options: {
                                                additionalData: `@import "./sources/style/modules/mixins.scss";`
                                            }
                                        }
                                    ]
                                },
                                {
                                    test: /\.m?js$/,
                                    exclude: /node_modules/,
                                    use: {
                                        loader: "babel-loader",
                                        options: {
                                            presets: ['@babel/preset-env']
                                        }
                                    }
                                }
                            ]
                        },
                        plugins: [
                            new VueLoaderPlugin()
                        ],
                        optimization: {
                            minimize: build,
                            minimizer: [
                                new TerserPlugin({
                                    extractComments: false,
                                    terserOptions: {
                                        format: {
                                            comments: false,
                                        },
                                    },
                                })
                            ],
                        }
                    }))
                    .on('error', function handleError() { this.emit('end'); })
                    .pipe(gulp.dest(assetsPath))
                    .on('end', ()=>{
                        if (live) {
                            browserSync.reload();
                        }
                    })
                    .pipe(touch());
            }
        });
    }
    script('base');
    script('global');

    done();
});

gulp.task('svg-sprites', function (done) {
    gulp.src(sourcesPath + '/svg/**/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                // $('[fill]').removeAttr('fill');
                // $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                inline: true,
                symbol: {
                    sprite: '../svg-symbols.svg',
                }
            }
        }))
        .pipe(replace('<?xml version="1.0" encoding="utf-8"?>', ''))
        .pipe(gulp.dest(assetsPath))
        .pipe(touch());
    done();
});

gulp.task('default', gulp.series((done)=>{
    del.sync(assetsPath);
    done();
}, 'style', 'js', 'svg-sprites'));

gulp.task('build', gulp.series((done)=>{
    build = true;
    assetsPath = './build';
    del.sync(assetsPath);
    done();
}, 'style', 'js', 'svg-sprites'));

gulp.task('watch', gulp.series((done)=>{
    del.sync(assetsPath);
    watch = true;
    done();
}, 'style', 'js', 'svg-sprites', function(done) {
    gulp.watch([sourcesPath + '/**/*.scss', sourcesPath + '/**/*.css'], gulp.series('style', 'js'));
    gulp.watch([sourcesPath + '/**/*.js', sourcesPath + '/**/*.vue'], gulp.series('js'));
    gulp.watch(sourcesPath + '/svg/**/*.svg', gulp.series('svg-sprites'));
    done();
}));

gulp.task('live', gulp.series((done)=>{
    del.sync(assetsPath);
    watch = true;
    live = true;
    done();
}, 'style', 'js', 'svg-sprites', function(done) {
    browserSync.init({
        proxy: "emc/h",
        reloadDelay: 300,
        notify: false
    });
    gulp.watch([sourcesPath + '/**/*.scss', sourcesPath + '/**/*.css'], gulp.series('style', 'js')).on('change', browserSync.reload);
    gulp.watch([sourcesPath + '/**/*.js', sourcesPath + '/**/*.vue'], gulp.series('js'));
    gulp.watch(['../h/**/*.php']).on('change', browserSync.reload);
    gulp.watch(sourcesPath + '/svg/**/*.svg', gulp.series('svg-sprites')).on('change', browserSync.reload);
    done();
}));