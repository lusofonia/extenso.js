import { readFile, writeFile } from 'node:fs/promises'

const declarationUrl = new URL('../dist/types/index.d.ts', import.meta.url)
const esmDeclarationUrl = new URL('../dist/types/index.d.mts', import.meta.url)
const commonJsDeclarationUrl = new URL('../dist/types/index.d.cts', import.meta.url)
const declaration = await readFile(declarationUrl, 'utf8')
const esmDeclaration = declaration
    .replace(
        /from '(\.[^']+)'/g,
        (_, specifier) => `from '${specifier}.js'`,
    )
    .replace(
        /import\("(\.[^"]+)"\)/g,
        (_, specifier) => `import("${specifier}.js")`,
    )
const exportedTypesMatch = declaration.match(/export type \{([\s\S]*?)\} from '\.\/types';/)

if (!exportedTypesMatch) {
    throw new Error('Could not find the public type exports in the generated declaration')
}

const exportedTypes = exportedTypesMatch[1]
    .split(',')
    .map(type => type.trim())
    .filter(Boolean)

const commonJsDeclaration = declaration
    .replace(
        /import type \{ ExtensoOptions \} from '\.\/types';/,
        'import type * as PublicTypes from \'./types\';',
    )
    .replace(/export type \{[\s\S]*?\} from '\.\/types';\n/, '')
    .replace(/import\("\.\/types"\)\./g, 'PublicTypes.')
    .replace(/ExtensoOptions/g, 'PublicTypes.ExtensoOptions')
    .replace(
        /export default extenso;\n$/,
        `declare namespace extenso {\n${exportedTypes
            .map(type => `    export type ${type} = PublicTypes.${type}`)
            .join('\n')}\n}\n\nexport = extenso;\n`,
    )

await Promise.all([
    writeFile(esmDeclarationUrl, esmDeclaration),
    writeFile(commonJsDeclarationUrl, commonJsDeclaration),
])
