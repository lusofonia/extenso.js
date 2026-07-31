import { readFile, writeFile } from 'node:fs/promises'

const declarationUrl = new URL('../dist/types/index.d.ts', import.meta.url)
const esmDeclarationUrl = new URL('../dist/types/index.d.mts', import.meta.url)
const declaration = await readFile(declarationUrl, 'utf8')
const esmDeclaration = declaration.replace(
    /from '(\.[^']+)'/g,
    (_, specifier) => `from '${specifier}.js'`,
)

await writeFile(esmDeclarationUrl, esmDeclaration)
