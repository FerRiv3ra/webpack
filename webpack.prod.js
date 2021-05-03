const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path'); 
 
module.exports = {
 
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      },
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\.(png|jpg|svg|gif)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
        ],
        }),
        new CleanWebpackPlugin(),
    ]
}