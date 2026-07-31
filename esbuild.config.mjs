import esbuild from 'esbuild'
import { readFile } from 'node:fs/promises'

const packageJson = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
const year = (new Date()).getFullYear()
const banner = `/*! ${packageJson.name} v${packageJson.version} | MIT (c) 2015-${year} by Matheus Alves */\n`

const options = [
    {
        format: 'cjs',
        outfile: 'dist/extenso.cjs',
        banner: { js: banner },
        footer: { js: 'module.exports=module.exports.default;' },
    },
    {
        format: 'esm',
        outfile: 'dist/extenso.mjs',
        banner: { js: banner },
    },
    {
        format: 'iife',
        globalName: 'extenso',
        outfile: 'dist/extenso.umd.js',
        banner: { js: banner },
        footer: { js: 'extenso=extenso.default;' },
    },
]

await Promise.all(
    options.map((opt) => esbuild.build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        minify: true,
        sourcemap: true,
        target: 'node22',
        ...opt,
    })),
)
