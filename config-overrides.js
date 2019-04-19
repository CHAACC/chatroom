const { override, fixBabelImports,addWebpackAlias } = require('customize-cra')
const path = require('path')
module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: 'css'
    }),
    addWebpackAlias({
        '@component': path.resolve(__dirname, 'src', 'component')
      })
)
