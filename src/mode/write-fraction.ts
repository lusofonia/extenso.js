import Scales from '../ts/enum/scales.enum'
import writeInteger from '../core/write-integer'
import writeOrdinal from '../core/write-ordinal'
import type { ExtensoScale } from '../types'

const COMMON_DENOMINATORS = [
    '',
    'inteiro',
    'meio',
    'terço',
    'quarto',
    'quinto',
    'sexto',
    'sétimo',
    'oitavo',
    'nono',
    'décimo',
]

const denominatorName = (
    denominator: string,
    singular: boolean,
    scale: ExtensoScale,
): string => {
    const denominatorValue = BigInt(denominator)
    let name: string

    if (denominatorValue <= 10n) {
        name = COMMON_DENOMINATORS[Number(denominatorValue)]
    } else if (/^10+$/.test(denominator)) {
        name = writeOrdinal(denominator, scale)
    } else {
        return `${writeInteger(denominator, scale)} avos`
    }

    return singular ? name : `${name}s`
}

/** Writes an exact fraction without reducing the supplied numerator and denominator. */
const writeFraction = (
    numerator: string,
    denominator: string,
    scale: ExtensoScale = Scales.SHORT,
): string => {
    const singular = BigInt(numerator) === 1n
    const numeratorText = writeInteger(numerator, scale)

    return `${numeratorText} ${denominatorName(denominator, singular, scale)}`
}

export default writeFraction
