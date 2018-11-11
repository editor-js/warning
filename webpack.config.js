module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
          test: /\.svg$/,
          loader: 'svg-inline-loader?removeSVGTagAttrs=false'
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
    library: "Warning",
    libraryTarget: 'umd'
  }
};
