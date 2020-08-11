module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/frontend-test-task/'
        : '/'
}