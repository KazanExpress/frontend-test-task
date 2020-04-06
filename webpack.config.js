/* eslint-disable */
const assert = require('assert')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const portfinder = require('portfinder')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const getMode = (env, argv) => {
  let mode = null

  const prodTags = ['prod', 'production']
  // const devTags = ['dev', 'develop', 'development']

  const setDev = () => {
    mode = 'development'
  }

  const setProd = () => {
    mode = 'production'
  }

  if (argv.mode && prodTags.includes(argv.mode)) {
    setProd()
  } else if (env.BUILD_MODE && prodTags.includes(env.BUILD_MODE)) {
    setProd()
  } else if (env.NODE_ENV && prodTags.includes(env.NODE_ENV)) {
    setProd()
  } else {
    setDev()
  }

  return mode
}

const getTarget = (env, argv) => argv.target || 'web'

const getEntryPath = (env, argv) => {
  const entry = argv.entry || argv._[0]
  assert(typeof entry === 'string', 'Please provide webpack entry')
  return path.resolve(__dirname, entry)
}

const getOutputPath = (env, argv) => {
  const regex = /\/+?([^/]+)\/?(?:src\/?$|$)/ // last dirname before 'src'

  return path.resolve(
    __dirname,
    argv.output ||
      'dist/' +
        regex.exec(
          path.parse(getEntryPath(env, argv).replace(/\\/g, '/')).dir
        )[1]
  )
}

const getPortPromise = portfinder.getPortPromise

module.exports = async (env = {}, argv = {}) => {
  const mode = getMode(env, argv)
  const target = getTarget(env, argv)
  const outputPath = getOutputPath(env, argv)
  const entryPath = getEntryPath(env, argv)
  const port = await getPortPromise()

  const isDev = mode === 'development'
  const isServer = !!process.env.WEBPACK_DEV_SERVER

  console.log(
    `\n\nwebpack mode: ${mode}\ncompiling: ${entryPath}${
      isServer ? `\nport:${port}` : ''
    }\n\n`
  )

  return {
    mode,
    target,
    devtool: isDev ? 'source-map' : false,
    entry: entryPath,
    resolve: {
      extensions: ['.js', '.vue', '.ts'],
      alias: {
        vue: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      },
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          // sourceMap: true,

          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              pure_funcs: [
                'console.info',
                'console.debug',
                'console.warn',
                'console.log',
              ],
            },
            // warnings: true,
            module: true,
            toplevel: true,
            ecma: 2015,

            mangle: true, // default value?
            // ie8: false, // default value
            // ecma: 5 // default value
          },
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],

      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // carefull with using this as it might actually increase bundle size
          // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2
          // https://webpack.js.org/guides/caching/
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
        // maxSize: 51200,
        // actually is seems to increase load time
        // https://developers.google.com/web/tools/chrome-devtools/network/issues
        // maxInitialRequests: Infinity,
        // chunks: 'all',
      },
    },
    module: {
      rules: [
        ...(isDev
          ? []
          : [
              {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
              },
            ]),
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          // test: /\.(woff(2)?|png|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          test: /\.(woff(2)?|png|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/',
                // publicPath: path.relative(outputPath, '/static'),
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.sass$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true,
                  fiber: require('fibers'),
                },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.styl(us)?$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    devServer: {
      contentBase: outputPath,
      compress: true,
      host: '0.0.0.0',
      historyApiFallback: true,
      hot: true,
      index: entryPath,
      open: false,
      overlay: true,
      port,
      stats: {
        normal: true,
      },
    },
    performance: {
      hints: isDev ? 'warning' : false,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new VuetifyLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      }),
      new webpack.ProvidePlugin({
        assert: 'assert',
      }),
      new HtmlWebpackPlugin({
        // favicon: 'public/favicon.ico',
        template: path.join(__dirname, 'public/index.html'),
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        // filename: 'style/[name].[/*  */contenthash].css',
        filename: 'style/[name].[hash].css',
        chunkFilename: 'style/[id].[hash].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      ...(isServer ? [] : [new WebpackBundleAnalyzer()]),
    ],
    output: {
      // filename: 'js/[name].[contenthash].js',
      filename: 'js/[name].[hash].js',
      publicPath: '/',
      chunkFilename: 'js/[id].[hash].bundle.js',
      path: outputPath,
      libraryTarget: 'umd',
    },
  }
}
