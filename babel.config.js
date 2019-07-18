module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        // env: {
        //     development: {
        //         plugins: [
        //             ['module-resolver', {
        //                 root: ['.'],
        //                 "extensions": [".ios.js", ".android.js", ".js", ".json",'.ts','.tsx'],
        //                 alias: {
        //                     '~@': './src',
        //                 },
        //             }],
        //         ],
        //     },
        // },
        plugins: [
            ['module-resolver', {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                    '.android.js',
                    '.android.tsx',
                    '.ios.js',
                    '.ios.tsx'
                ],
                alias: {
                    '@': './src',
                },
            }],
        ],
    };
};
