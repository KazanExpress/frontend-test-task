const { GenerateSW } = require("workbox-webpack-plugin");
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/frontend-test-task/'
        : '/',
    configureWebpack: {
        plugins: [new GenerateSW()]
    }
}