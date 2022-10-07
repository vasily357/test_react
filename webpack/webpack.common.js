const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = () => ({
    entry: path.resolve(__dirname, '..', 'src/index.tsx'),
    resolve: {
        alias: {
            components: path.resolve('.', 'src/components/'),
            context: path.resolve('.', 'src/context/'),
            reducers: path.resolve('.', 'src/reducers/'),
            api: path.resolve('.', 'src/api/'),
            constants: path.resolve('.', 'src/constants/'),
            hooks: path.resolve('.', 'src/hooks/'),
            layouts: path.resolve('.', 'src/layouts/'),
            pages: path.resolve('.', 'src/pages/'),
            store: path.resolve('.', 'src/store/'),
            utils: path.resolve('.', 'src/utils/'),
            types: path.resolve('.', 'src/types/'),
            img: path.resolve('.', 'src/img/'),
            styles: path.resolve('.', 'src/styles/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__MOD-[hash:base64:5]',
                            },
                        },
                    },
                    { loader: 'sass-loader' },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            hoistUseStatements: true,
                            resources: [
                                path.join('.', 'src/styles/variables.scss'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src/index.html'),
            publicPath: '/',
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, '..', 'src/img/favicon.png'),
        }),
        new CopyPlugin({
            patterns: [{ from: 'src', to: 'dest' }],
        }),
        new webpack.DefinePlugin({
            ENV_VARS: JSON.stringify(process.env),
        }),
    ],
    stats: 'errors-only',
})
