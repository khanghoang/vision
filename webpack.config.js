var webpack = require('webpack');
var path = require('path');

var query = {
  presets: ['react', 'es2015', 'stage-1']
}

module.exports = {

  context: __dirname + '/app',
  entry: {
    javascript: './index.js',
    html: "./index.html"
  },

  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  },

  module: {
    noParse: [
      /sinon/
    ],
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
    new webpack.HotModuleReplacementPlugin()
  ]

}
