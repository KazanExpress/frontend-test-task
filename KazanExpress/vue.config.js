let config = {}

if (process.env.NODE_ENV === 'production') {
    config = {
        outputDir: '../public/dist',
        publicPath: '../dist',
        indexPath: '../index.html'
    }
}

module.exports = config
// ,
//         publicPath: './dist',
//         indexPath: '../index.html
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/frontend-test-task/' : '/'
}
