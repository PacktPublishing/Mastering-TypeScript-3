// const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        app: './src/index.tsx',
        test: './test/react.app.tests.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.jsx'
        ]
    },
    mode: 'development'
}

module.exports = config;