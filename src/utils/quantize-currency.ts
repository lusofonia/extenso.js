import CurrencyRoundings from '../ts/enum/currency-roundings.enum'
import type { CurrencyRounding } from '../types'

interface QuantizedCurrency {
    subunit: string
    unit: string
}

const precisionError = (fractionDigits: number): RangeError => {
    if (fractionDigits === 2) {
        return new RangeError('Currency values must have zero, one, or two decimal places')
    }
    return new RangeError(`Currency values must have at most ${fractionDigits} decimal places`)
}

/** Applies an exact decimal-place policy without floating-point arithmetic. */
const quantizeCurrency = (
    integer: string,
    decimal: string,
    fractionDigits: number,
    rounding: CurrencyRounding = CurrencyRoundings.REJECT,
): QuantizedCurrency => {
    if (decimal.length > fractionDigits && rounding === CurrencyRoundings.REJECT) {
        throw precisionError(fractionDigits)
    }

    const keptDecimal = decimal.slice(0, fractionDigits).padEnd(fractionDigits, '0')
    const shouldRound = decimal.length > fractionDigits &&
        rounding === CurrencyRoundings.HALF_UP &&
        decimal[fractionDigits] >= '5'
    const scale = 10n ** BigInt(fractionDigits)
    let minorUnits = BigInt(`${integer}${keptDecimal}`)

    if (shouldRound) {
        minorUnits += 1n
    }

    const unit = (minorUnits / scale).toString()
    const subunitValue = minorUnits % scale
    const subunit = fractionDigits === 0
        ? '0'
        : subunitValue.toString().padStart(fractionDigits, '0')

    return { unit, subunit }
}

export default quantizeCurrency
