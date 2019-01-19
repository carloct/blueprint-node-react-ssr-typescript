import path from 'path';
import merge from 'webpack-merge';

import BaseWebpackConfig from  './webpack.config.base.babel';

export default merge(BaseWebpackConfig, {

  entry: {
    app: [
      './frontend/src/index',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'frontenv/dist/dev'),
    filename: '[name].[hash:10].js',
    chunkFilename: '[name].[hash:10].js'
  },

  devServer: {
    port: process.env.PORT_WEBPACK_DEV_SERVER || 3004,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT || 3003}`,
        secure: false,
      },
    },

    open: true,
    historyApiFallback: true
  },

  devtool: 'eval-source-map',
});
