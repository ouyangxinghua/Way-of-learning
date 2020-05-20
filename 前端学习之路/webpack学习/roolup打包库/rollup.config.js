import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser';
process.env.NODE_ENV = 'production';
const isDev = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV)

module.exports = {
    input: './src/index.js',
    output: {
        name: 'jinmengyao',
        file: './build/main.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true,       // 使plugin-transform-runtime生效
        }),
        terser()
    ]
}
