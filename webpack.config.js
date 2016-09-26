var webpack = require('webpack');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = {
    entry: [
        // './src/assets/js/echarts.min.js',
        // './node_modules/jquery/dist/jquery.min.js',
        './src/assets/js/money.js',
        './src/assets/js/barrage.js',
        './src/main.js'
    ],
    output: {
        path: './dist/',
        filename: 'index.[hash:8].js',
    },
    devServer: {
        inline: true,
        port: 5555
    },
    externals: {
        jquery: 'window.$'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
                // query: {
                //     presets: ['es2015', 'react']
                // }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?sourceMap'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0', 'react']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        function() {
            this.plugin('done', stats => {
                console.log('done')
                fs.readFile('./index.html', { encoding: 'utf8' }, (err, data) => {
                    //console.log(data.toString())
                    const $ = cheerio.load(data.toString(), { decodeEntities: false });
                    $('script[src*=index]').attr('src', 'index.' + stats.hash.substr(0, 8) + '.js');
                    //console.log($.html())
                    fs.writeFile('./dist/index.html', $.html(), err => {
                        !err && console.log('Set has success: ' + stats.hash.substr(0, 8))
                    })
                })
            })
        }
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity) // 这是第三方库打包生成的文件
    ]
}
