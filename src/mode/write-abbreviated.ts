import Scales from '../ts/enum/scales.enum'
import type { ExtensoScale } from '../types'

const ABBREVIATIONS: Record<ExtensoScale, string[]> = {
    [Scales.SHORT]: [
        'mil',
        'mi',
        'bi',
        'tri',
        'qua',
        'qui',
        'sex',
        'sep',
        'oct',
        'non',
        'dec',
        'undec',
        'duodec',
    ],
    [Scales.LONG]: [
        'mil',
        'mi',
        'mil mi',
        'bi',
        'mil bi',
        'tri',
        'mil tri',
        'qua',
        'mil qua',
        'qui',
        'mil qui',
        'sex',
        'mil sex',
        'sep',
        'mil sep',
        'oct',
        'mil oct',
        'non',
        'mil non',
        'dec',
        'mil dec',
        'undec',
        'mil undec',
        'duodec',
    ],
}

const formatUnabbreviated = (integer: string, decimal: string): string => {
    const significantDecimal = decimal.replace(/0+$/, '')

    return significantDecimal === ''
        ? integer
        : `${integer},${significantDecimal}`
}

const roundToTenths = (integer: string, decimal: string, exponent: number): bigint => {
    const decimalDigits = decimal === '0' ? '' : decimal
    const digits = BigInt(`${integer}${decimalDigits}`)
    const decimalDivisor = 10n ** BigInt(decimalDigits.length)
    const magnitude = 10n ** BigInt(exponent)
    const divisor = decimalDivisor * magnitude

    return ((digits * 10n) + (divisor / 2n)) / divisor
}

/**
 * Formats a number using compact Portuguese scale abbreviations.
 * Values below one thousand are returned without a scale suffix.
 * @param integer - Absolute integer part of the number
 * @param decimal - Decimal part of the number
 * @param scale - Scale used to select the abbreviation
 * @returns The number in compact notation
 */
const writeAbbreviated = (
    integer: string,
    decimal = '0',
    scale: ExtensoScale = Scales.SHORT,
): string => {
    if (integer.length < 4) {
        return formatUnabbreviated(integer, decimal)
    }

    let magnitudeIndex = Math.floor((integer.length - 1) / 3) - 1
    let roundedTenths = roundToTenths(integer, decimal, (magnitudeIndex + 1) * 3)

    if (roundedTenths === 10000n) {
        magnitudeIndex += 1
        roundedTenths = 10n
    }

    const abbreviation = ABBREVIATIONS[scale][magnitudeIndex]

    if (abbreviation === undefined) {
        throw new Error(`Number exceeds ${scale} scale limit`)
    }

    const whole = roundedTenths / 10n
    const tenths = roundedTenths % 10n
    const compactNumber = tenths === 0n
        ? whole.toString()
        : `${whole},${tenths}`

    return `${compactNumber} ${abbreviation}`
}

export default writeAbbreviated
