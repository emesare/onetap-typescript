import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import { babel } from '@rollup/plugin-babel';

export default {
    input: './dist/intermediates/main.js',
    output: {
        file: './dist/dev-bundle.js',
        format: 'es',
        sourcemap: false,
    },
    plugins: [
        strip({
            include: ['./dist/intermediates/**/*.js'],
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                [
                    "@babel/env",
                    {
                        "loose": true,
                        "useBuiltIns": "entry",
                        "targets": {
                            "browsers": ["IE 6"]
                        },
                        "corejs": 3
                    }
                ]
            ]
        }),
        commonjs({ transformMixedEsModules: true })
    ]
};
