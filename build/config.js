module.exports = exports = [
    {
        input: './src/index.js',
        output: {
            file: './dist/scroll-listener.esm.js',
            format: 'es',
        },
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/scroll-listener.cjs.js',
            format: 'cjs',
        },
    },
];