var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;

module.exports = {
  entry: [
    'bootstrap-sass!./bootstrap-sass.config.js',
    './app/scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/assets/',
    contentBase: 'public/'
  },
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', 'app/scripts', 'app/styles'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'jsx-loader?harmony=true'],
        include: path.join(__dirname, 'app/scripts')
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?includePaths[]=' + bourbon
      },

      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  }
};
