import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)))
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'extenso-consumer-'))

try {
    const packOutput = execFileSync(
        'npm',
        ['pack', '--json', '--pack-destination', temporaryDirectory],
        { cwd: projectDirectory, encoding: 'utf8' },
    )
    const [{ filename }] = JSON.parse(packOutput)
    const tarball = join(temporaryDirectory, filename)

    await writeFile(join(temporaryDirectory, 'package.json'), JSON.stringify({
        private: true,
        type: 'module',
    }))
    execFileSync(
        'npm',
        ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarball],
        { cwd: temporaryDirectory, stdio: 'pipe' },
    )

    await writeFile(join(temporaryDirectory, 'consumer.cjs'), `
const assert = require('node:assert/strict')
const extenso = require('extenso')
assert.equal(typeof extenso, 'function')
assert.equal(extenso(123), 'cento e vinte e três')
`)
    execFileSync('node', ['consumer.cjs'], { cwd: temporaryDirectory, stdio: 'pipe' })

    await writeFile(join(temporaryDirectory, 'consumer.mjs'), `
import assert from 'node:assert/strict'
import extenso from 'extenso'
assert.equal(typeof extenso, 'function')
assert.equal(extenso(123), 'cento e vinte e três')
`)
    execFileSync('node', ['consumer.mjs'], { cwd: temporaryDirectory, stdio: 'pipe' })

    await writeFile(join(temporaryDirectory, 'consumer.ts'), `
import extenso, { type ExtensoOptions } from 'extenso'
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
        files: ['consumer.ts'],
    }))
    const typeScriptBinary = join(projectDirectory, 'node_modules', 'typescript', 'bin', 'tsc')
    execFileSync(process.execPath, [typeScriptBinary, '--project', 'tsconfig.json'], {
        cwd: temporaryDirectory,
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
