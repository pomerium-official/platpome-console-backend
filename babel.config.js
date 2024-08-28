module.exports = {
    presets: ['@babel/env'],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
        ['@babel/plugin-proposal-private-methods', {loose: true}],
        ["module-resolver",
            {
                "alias": {
                    "@": "./dist"
                }
            }]
    ]
};
