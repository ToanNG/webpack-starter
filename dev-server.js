var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
  contentBase: config.output.contentBase,
  hot: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
  historyApiFallback: false
});
server.listen(3000, 'localhost', function (err, res) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
