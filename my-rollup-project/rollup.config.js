import json from 'rollup-plugin-json';

export default {
    input: './src/main.js',
    output: [{
        file: 'bundle.js',
        format: 'cjs',
        banner: '// welcome to me',
        footer: '// by yangwend'
    }, {
        file: 'bundle-2.js',
        format: 'es',
        banner: '// welcome to me',
        footer: '// by yangwend'
    }],
    plugins: [json()]
};