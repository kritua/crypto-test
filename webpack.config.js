const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');

const DIR_SRC = resolve(__dirname, 'src');
const DIR_BUILD = resolve(__dirname, 'build');

module.exports = (env = {}) => {
    process.env.NODE_ENV = env.production ? 'production' : 'development';

    return {
        mode : process.env.NODE_ENV,
        bail : !!env.production,
        entry: './src',
        output: {
            path         : DIR_BUILD,
            filename     : `assets/${env.production ? '[contenthash]' : '[name]-[fullhash:6]'}.js`,
            chunkFilename: `assets/${env.production ? '[contenthash]' : '[name]-[fullhash:6]'}.js`,
            publicPath   : '/'
        },
        devtool    : env.production ? false : 'eval-source-map',
        target     : 'web',
        devServer  : {
            host              : '0.0.0.0',
            port              : 8080,
            contentBase       : DIR_BUILD,
            compress          : false,
            historyApiFallback: true,
            clientLogLevel    : 'error',
            index             : 'index.html',
            proxy             : [{
                context     : ['/v1/**'],
                target      : 'https://ton-swap-indexer.broxus.com/',
                secure      : false,
                changeOrigin: true
            }]
        },
        resolve: {
            symlinks  : false,
            extensions: ['.ts', '.tsx', '.js', '.json', '.pcss'],
            alias     : {
                'config'   : resolve(__dirname, 'config'),
                'component': resolve(DIR_SRC, 'components'),
                'hook'     : resolve(DIR_SRC, 'hooks'),
                'route'    : resolve(DIR_SRC, 'routes'),
                'locale'   : resolve(DIR_SRC, 'locales'),
                'adapter'  : resolve(DIR_SRC, 'adapters'),
                'src'      : DIR_SRC
            }
        },
        module: {
            rules: [{
                test   : /\.tsx?$/,
                exclude: /node_modules/,
                include: DIR_SRC,
                use: [{
                    loader : 'ts-loader',
                    options: {
                        transpileOnly: !env.production
                    }
                }]
            }, {
                test   : /\.css/,
                include: [/node_modules/],
                use    : [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader : 'css-loader',
                    options: {
                        modules: false
                    }
                }]
            }, {
                test   : /\.p?css$/,
                include: DIR_SRC,
                use    : [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader : 'css-loader',
                    options: {
                        importLoaders : 1,
                        sourceMap     : !env.production,
                        modules       : {
                            auto          : (path) => path.endsWith('module.pcss'),
                            localIdentName: env.production ? '[hash:6]' : '[local]__[hash:base64:5]'
                        }
                    }
                }, {
                    loader : 'postcss-loader',
                    options: {
                        sourceMap     : !env.production,
                        postcssOptions: {
                            plugins: [
                                'postcss-nested'
                            ]
                        }
                    }
                }]
            }, {
                test     : /\.(woff2?|svg|png|ico|jpg|jpeg|pdf|webm|mp3|mp4|ttf)$/,
                type     : 'asset/resource',
                generator: {
                    filename: `assets/${env.production ? '[contenthash]' : '[name]-[hash:6]'}[ext]`
                }
            }]
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: process.env.NODE_ENV
            }),
            new webpack.DefinePlugin({
                __PRODUCTION__ : !!env.production,
                __DEVELOPMENT__: !env.production,
                __VERSION__    : JSON.stringify(version)
            }),
            new MiniCssExtractPlugin({
                filename     : env.production ? 'assets/[contenthash].css' : 'assets/[name].css',
                chunkFilename: env.production ? 'assets/[id].[hash].css' : 'assets/[id].css'
            }),
            new HtmlWebpackPlugin({
                template: resolve(DIR_SRC, 'index.html'),
                minify  : !!env.production,
                filename: 'index.html'
            })
        ]
    };
};
