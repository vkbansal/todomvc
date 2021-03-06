"use strict";

let webpack = require("webpack"),
    path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "..", "..", "public", path.basename(__dirname)),
        filename: "app.js",
        sourceMapFileName: "app.js.map"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel"],
                exclude: /node_modules/
            }
        ]
    },
    externals: {
        "jquery": "jQuery"
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            mangle: false
        })
    ]
};
