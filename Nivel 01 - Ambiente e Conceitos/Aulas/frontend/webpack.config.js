const path = require('path');

module.exports = {
  // Entrada
  entry: path.resolve(__dirname, 'src', 'index.js'),
  // Saída
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  // Configs
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ]
      },
      {
        test: /.*\.(gif|jpe?g|png)$/i,
        use: {
          loader: 'file-loader',
        }
      }
    ]
  }
}