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
        preLoaders: [
            {
                test: /\.tag$/,
                loader: "riotjs",
                exclude: /node_modules/,
                query: {
                    type: "babel"
                }
            }
        ],
        loaders: [
            {
                test: /\.js|\.tag$/,
                loader: "babel",
                exclude: /node_modules/
            }
        ]
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
