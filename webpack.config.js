var webpack = require('webpack');
var path = require('path');

var query = {
  presets: ['react', 'es2015', 'stage-1']
}

module.exports = {

  context: __dirname + '/app/script.babel',

  entry: {
    background: './background/background.js',
    // panel: './panel/panel.js',
    backgroundSinon: './background/sinon.js',
    html: "./index.html"
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/app/script'
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  },

  module: {
    loaders: [
      {
        // babel
        test: /\.js/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel-loader?'+JSON.stringify(query)],
        include: __dirname
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.png$/, loader: "url-loader?limit=100000"},
      { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: "url-loader?limit=100000"},
      { test: /\.(jpg|gif)$/, loader: "file-loader" }
    ]
  },

  plugins: [
  ]

}
