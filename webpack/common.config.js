const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const helpers = require('./helpers')

module.exports = function() {
  return {
    entry: './src/index.ts',
    output: {
      path: helpers.root('dist'),
      filename: 'bundle.js',
      library: 'MyLib',
      libraryTarget: 'umd2',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.json',
          },
          exclude: [/\.(spec|e2e)\.ts$/],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.css'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new CheckerPlugin(),
    ],
  }
}
