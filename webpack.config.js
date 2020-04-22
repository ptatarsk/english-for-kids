const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDevelope = process.env.NODE_ENV === 'development';
const isProduct = !isDevelope;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProduct) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const fileName = (extension) => (isDevelope ? `[name].${extension}` : `[name].[hash].${extension}`);

const cssLoader = (additional) => {
  const loader = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDevelope,
      reloadAll: true,
    },
  },
  'css-loader',
  ];

  if (additional) {
    loader.push(additional);
  }

  return loader;
};

const jsLoader = () => {
  const loader = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  }];

  if (isDevelope) {
    loader.push('eslint-loader');
  }

  return loader;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: isDevelope ? 'source-map' : 'none',
  entry: {
    index: ['@babel/polyfill', './index.js'],
    style: ['./sass/style.scss'],
  },
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hot: isDevelope,
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: optimization(),
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProduct,
      },
    }),
    new CopyPlugin([{
      from: 'assets',
      to: 'assets',
    }]),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: jsLoader(),
    },
    {
      test: /\.css$/,
      use: cssLoader(),
    },
    {
      test: /\.s[ac]ss$/,
      use: cssLoader('sass-loader'),
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: './assets/images/',
          },
        },
      ],
    },
    {
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: './assets/audio/',
          },
        },
      ],
    },
    {
      test: /\.(svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: './assets/icons/',
          },
        },
      ],
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: ['file-loader'],
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    ],
  },
};
