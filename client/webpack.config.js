const path = require('path');

// const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',

    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
          "zlib": require.resolve("browserify-zlib"),
          "querystring": require.resolve("querystring-es3"),
          "path": require.resolve("path-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "http": require.resolve("stream-http"),
          "url": require.resolve("url/"),
          "util": require.resolve("util/"),
          "vm": require.resolve("vm-browserify"),
          "assert": require.resolve("assert-browserify"),
          "async_hooks": false,
          "fs": false,
          "net": false
        }
      },

      output: {
        filename: 'bundle.js', // Output filename
        path: path.resolve(__dirname, 'build'), // Output directory
        publicPath: '/',
    },

    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
      ],
    // Path to your entry point. From this file Webpack will begin its work
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(mp4)$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'videos/', // or any other directory where you want to store your videos
                  },
                }
            }
        ]
    },
    // externals: [nodeExternals()],
    
    mode: 'development',
    externals: {
        express: 'express',
    },
    devServer: {
      historyApiFallback: true,
      // contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000, // specify the port here
    },
  };