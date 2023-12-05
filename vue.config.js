const packageInfo = require('./package.json')
const Timestamp = new Date().getTime()

module.exports = {
    devServer: {
        port: 8080,
        host: "0.0.0.0",
        https: false,
        open: true
    },
    outputDir: "dist",
    productionSourceMap: false,
    filenameHashing: false,
    configureWebpack: {
        output: {
            filename: `js/[name].${packageInfo.version}.${Timestamp}.js`,
            chunkFilename: `js/[name].${packageInfo.version}.${Timestamp}.js`
        }
    },
    chainWebpack: (config) => {
        config.plugins.delete('optimize-css')
    },
    lintOnSave: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }

}