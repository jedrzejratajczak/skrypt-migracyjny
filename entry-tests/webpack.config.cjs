const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: {
      type: 'commonjs2'
    }
  }
};

// module.exports = ['module', 'var', 'commonjs2'].map((format) => ({
//   entry: './index.js',
//   output: {
//     path: './',
//     filename: 'index.' + format + '.js',
//     library: {
//       name: 'index',
//       type: format
//     }
//   }
// }));
