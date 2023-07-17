const path = require('path');

module.exports = {
  entry: {
    homepage: './.out_typescript/index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|\.out_typescript)/,
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
    path: path.resolve(__dirname, '.out_webpack'),
  },
};
