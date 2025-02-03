import esbuild from 'esbuild'

const year = (new Date()).getFullYear()
const banner = `/*! Extenso.js v2.1.0 | MIT (c) 2015-${year} by Matheus Alves */\n`

const options = [
    {
        format: 'cjs',
        outfile: 'dist/extenso.cjs.js',
        banner: { js: banner },
    },
    {
        format: 'esm',
        outfile: 'dist/extenso.esm.js',
        banner: { js: banner },
    },
    {
        format: 'iife',
        globalName: 'extenso',
        outfile: 'dist/extenso.umd.js',
        banner: { js: banner },
    },
]

options.forEach((opt) => {
    esbuild.build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        minify: true,
        sourcemap: true,
        ...opt,
    }).catch(() => process.exit(1))
})
