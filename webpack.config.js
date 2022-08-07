const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: mode,

  devtool: 'source-map',
  devServer: {
    static: 'dist',
    open: true,
    hot: true,
    watchFiles: ['src/**/*'],
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mario Clone',
      filename: './index.html',
      template: './src/template.html',
      favicon: './src/assets/favicon.svg',
    }),
    new MiniCssExtractPlugin(),
  ],
};
