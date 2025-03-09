import pluralize from '../utils/pluralize'
import writeInteger from './write-integer'
import listDecimals from '../lists/list-decimals'

/**
 * Writes a decimal number in words
 * @param input - The decimal part to write
 * @throws {Error} If the number exceeds the limit
 */
const writeDecimal = (input: string): string => {
    const text = writeInteger(input)
    const count = Number(input)

    if (input.length === 1) {
        return `${text} ${pluralize('décimo', count)}`
    }
    if (input.length === 2) {
        return `${text} ${pluralize('centésimo', count)}`
    }

    const name = listDecimals[Math.floor(input.length / 3) - 1]

    if (name === undefined) {
        throw new Error(`Number exceeds limit`)
    }

    switch (input.length % 3) {
    case 1:
        return `${text} ${pluralize('décimo', count)} de ${name}`
    case 2:
        return `${text} ${pluralize('centésimo', count)} de ${name}`
    case 0:
    default:
        return `${text} ${pluralize(name, count)}`
    }
}

export default writeDecimal