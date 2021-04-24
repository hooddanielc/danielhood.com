// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlWebpackPlugin = new HtmlWebPackPlugin({
//   template: "./src/index.html",
//   filename: "./index.html"
// });

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // },
      // {
      //   test: /\.(ttf|eot|woff|woff2)$/,
      //   loader: "file-loader",
      // },
      {
        test: /\.(json)$/,
        type: 'json'
      },
      {
        test: /\.(ttf|eot|woff|woff2|jpeg|png|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /.html$/,
        type: 'asset/resource',
        generator: {
          filename: 'index.html'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
