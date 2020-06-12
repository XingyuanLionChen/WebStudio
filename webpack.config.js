const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

const configuration = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'awesome-typescript-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CheckerPlugin()
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        configuration.devtool = 'source-map';
    }
    else if (argv.mode === 'production') {
        //...
    }

    return configuration;
};