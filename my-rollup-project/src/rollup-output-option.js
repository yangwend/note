module.exports = [{
    file: './dist/index-cjs.js',
    format: 'cjs',
    banner: '// welcome to me',
    footer: '// by yangwend'
}, {
    file: './dist/index-es.js',
    format: 'es',
    banner: '// welcome to me',
    footer: '// by yangwend'
}, {
    file: './dist/index-amd.js',
    format: 'amd',
    banner: '// welcome to me',
    footer: '// by yangwend'
}, {
    file: './dist/index-umd.js',
    format: 'umd',
    name: 'yangwend-umd', // 指定文件名称
    banner: '// welcome to me',
    footer: '// by yangwend'
}]