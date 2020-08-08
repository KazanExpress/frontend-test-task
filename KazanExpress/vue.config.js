let config={}

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
