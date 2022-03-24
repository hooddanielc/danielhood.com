const path = require('path');

module.exports = {
  entry: {
    homepage: './.webpack/index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: '3.18.3',
                }],
                '@babel/preset-react',
              ],
              plugins: [
                "@emotion/babel-plugin",
              ],
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
