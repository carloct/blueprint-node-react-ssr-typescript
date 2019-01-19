import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

const devMode = process.env.NODE_ENV !== 'production';

export default {
  context: path.resolve(__dirname),

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !devMode,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [postcssImport, postcssPresetEnv, cssnano],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !devMode,
              importLoaders: 2,
              modules: true,
              localIdentName: '[local]--[hash:base64:8]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [postcssImport, postcssPresetEnv, cssnano],
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true }}
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
        use : [
          { loader: 'url-loader', options: { limit: 10000, name: '[name].[hash:7].[ext]' } },
          { loader: 'image-webpack-loader', options: { disable: devMode } },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          { loader: 'url-loader', options: { limit: 10000, name: '[name].[hash:7].[ext]' } },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          { loader: 'url-loader', options: { limit: 10000, name: '[name].[hash:7].[ext]' } },
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test Title',
      template: path.resolve(__dirname, 'frontend/public/index.ejs'),
    }),
  ],

  resolve: {
    // What directories should be searched when resolving modules
    modules: [
      'node_modules',
      'frontend/src',
    ],
    // Automatically resolve certain extensions (Ex. import 'folder/name(.ext)')
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.scss',
    ],
  },
}
