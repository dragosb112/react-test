var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + '/play-nine.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                presets: [
                    'react',
                    'es2015',
                    'stage-2'
                    ]
                }
            }
        ]
    },
    // externals: {
    // // Don't bundle the 'react' npm package with the component.
    // 'react': 'React' 
    // },
    resolve: {
        // Include empty string '' to resolve files by their explicit extension
        // (e.g. require('./somefile.ext')).
        // Include '.js', '.jsx' to resolve files by these implicit extensions
        // (e.g. require('underscore')).
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;