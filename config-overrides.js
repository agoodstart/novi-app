const path = require('path');

module.exports = {
  resolve: {
    extensions: ['js', 'ts'],
    alias: {
      '@components': path.resolve(__dirname, 'lib/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    }
  }
}