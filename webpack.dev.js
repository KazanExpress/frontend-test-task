const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    devtool: "source-map",
    output: {
        filename: "main.min.js",
        path: path.resolve(__dirname, "./build/"),
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    compilerOptions: {
                        scopeId: 'scoped'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/",
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!assets", "!assets/**/*"],
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new ESLintPlugin({
            extensions: ['js', 'ts', 'vue'],
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name].min.css",
        }),

        new VueLoaderPlugin(),

        new CopyPlugin({
            patterns: [
                {
                    from: "./src/assets",
                    to: "./assets",
                    globOptions: {
                        copyUnmodified: true,
                        force: false,
                    },
                },
            ],
        }),
    ],
};

