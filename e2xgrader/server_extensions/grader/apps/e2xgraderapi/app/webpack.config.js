const path = require('path');
module.exports = {
  entry: './src/api.js',
  output: {
    filename: 'api.min.js',
    path: path.resolve(__dirname, 'build'),
    library: 'e2xAPI',
  },
  externals: {
  },
};
