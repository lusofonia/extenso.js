import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)))
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'extenso-consumer-'))
const npmCli = process.env.npm_execpath
const safeEnvironment = { ...process.env, PATH: '/usr/bin:/bin' }

assert.ok(npmCli, 'This test must be run from an npm script')

try {
    const packOutput = execFileSync(
        process.execPath,
        [npmCli, 'pack', '--json', '--pack-destination', temporaryDirectory],
        { cwd: projectDirectory, encoding: 'utf8', env: safeEnvironment },
    )
    const [{ filename }] = JSON.parse(packOutput)
    const tarball = join(temporaryDirectory, filename)

    await writeFile(join(temporaryDirectory, 'package.json'), JSON.stringify({
        private: true,
        type: 'module',
    }))
    execFileSync(
        process.execPath,
        [npmCli, 'install', '--ignore-scripts', '--no-audit', '--no-fund', tarball],
        { cwd: temporaryDirectory, env: safeEnvironment, stdio: 'pipe' },
    )

    await writeFile(join(temporaryDirectory, 'consumer.cjs'), `
const assert = require('node:assert/strict')
const extenso = require('extenso')
assert.equal(typeof extenso, 'function')
assert.equal(extenso(123), 'cento e vinte e três')
assert.equal(extenso(11, { number: { ordinal: true } }), 'décimo primeiro')
assert.equal(extenso(1500, { mode: 'abbreviated' }), '1,5 mil')
assert.equal(extenso(123, { removeAccents: true }), 'cento e vinte e tres')
`)
    execFileSync(process.execPath, ['consumer.cjs'], {
        cwd: temporaryDirectory,
        env: safeEnvironment,
        stdio: 'pipe',
    })

    await writeFile(join(temporaryDirectory, 'consumer.mjs'), `
import assert from 'node:assert/strict'
import extenso from 'extenso'
assert.equal(typeof extenso, 'function')
assert.equal(extenso(123), 'cento e vinte e três')
assert.equal(extenso(1500000, { mode: 'abbreviated' }), '1,5 mi')
assert.equal(extenso(123, { removeAccents: true }), 'cento e vinte e tres')
`)
    execFileSync(process.execPath, ['consumer.mjs'], {
        cwd: temporaryDirectory,
        env: safeEnvironment,
        stdio: 'pipe',
    })

    await writeFile(join(temporaryDirectory, 'consumer.ts'), `
import extenso, { type CurrencyRounding, type ExtensoOptions } from 'extenso'
const rounding: CurrencyRounding = 'half-up'
const ordinalOptions: ExtensoOptions = { mode: 'number', number: { ordinal: true } }
const numberOptions: ExtensoOptions = { mode: 'number' }
const customCurrency: ExtensoOptions = {
    currency: {
        fractionDigits: 3,
        rounding,
        singular: 'crédito',
        plural: 'créditos',
        gender: 'male',
        subunit: {
            singular: 'ficha',
            plural: 'fichas',
            gender: 'female',
        },
    },
}
const abbreviatedOptions: ExtensoOptions = { mode: 'abbreviated' }
const accentlessOptions: ExtensoOptions = { mode: 'number', removeAccents: true }
const ordinalResult: string = extenso(11, ordinalOptions)
const numberResult: string = extenso(123, numberOptions)
const abbreviatedResult: string = extenso(1500, abbreviatedOptions)
const accentlessResult: string = extenso(123, accentlessOptions)
const customResult: string = extenso('2.01', customCurrency)
void ordinalResult
void numberResult
void abbreviatedResult
void accentlessResult
void customResult
`)
    await writeFile(join(temporaryDirectory, 'consumer.cts'), `
import extenso = require('extenso')
import type { ExtensoOptions } from 'extenso'
const options: ExtensoOptions = { mode: 'number' }
const result: string = extenso(123, options)
void result
`)
    await writeFile(join(temporaryDirectory, 'tsconfig.json'), JSON.stringify({
        compilerOptions: {
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            strict: true,
            target: 'ES2022',
            noEmit: true,
        },
        files: ['consumer.ts', 'consumer.cts'],
    }))
    const typeScriptBinary = join(projectDirectory, 'node_modules', 'typescript', 'bin', 'tsc')
    execFileSync(process.execPath, [typeScriptBinary, '--project', 'tsconfig.json'], {
        cwd: temporaryDirectory,
        env: safeEnvironment,
        stdio: 'pipe',
    })

    const installedPackage = JSON.parse(await readFile(
        join(temporaryDirectory, 'node_modules', 'extenso', 'package.json'),
        'utf8',
    ))
    assert.equal(installedPackage.name, 'extenso')
    console.log('Installed-package checks passed for CommonJS, ESM, and TypeScript.')
} finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
}
