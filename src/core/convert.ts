import writeAbbreviated from '../mode/write-abbreviated'
import writeCurrency from '../mode/write-currency'
import writeDigit from '../mode/write-digit'
import writeFraction from '../mode/write-fraction'
import writeNumber from '../mode/write-number'
import writePercentage from '../mode/write-percentage'
import type {
    CurrencyCode,
    CurrencyDefinition,
    ExtensoMode,
    ExtensoOptions,
} from '../types'

interface ParsedNumber {
    kind: 'number'
    integer: string
    decimal: string
    decimalSeparator: ',' | '.'
    hasDecimalSeparator: boolean
}

interface ParsedFraction {
    kind: 'fraction'
    numerator: string
    denominator: string
}

/** Converts a parsed, unsigned number according to the selected output mode. */
const convert = (
    parsed: ParsedNumber | ParsedFraction,
    mode: ExtensoMode,
    currency: CurrencyCode | CurrencyDefinition,
    options: ExtensoOptions,
): string => {
    if (parsed.kind === 'fraction') {
        return writeFraction(parsed.numerator, parsed.denominator, options.scale)
    }

    const { integer, decimal, decimalSeparator, hasDecimalSeparator } = parsed
    const numberMode = mode as Exclude<ExtensoMode, 'fraction'>

    switch (numberMode) {
    case 'abbreviated':
        return writeAbbreviated(integer, decimal, options.scale)
    case 'currency':
        if (decimal.length > 2) {
            throw new RangeError('Currency values must have zero, one, or two decimal places')
        }
        return writeCurrency(integer, decimal, currency, options.scale)
    case 'digit':
        return hasDecimalSeparator
            ? writeDigit(`${integer}${decimalSeparator}${decimal}`)
            : writeDigit(integer)
    case 'number':
        return writeNumber(
            integer,
            decimal,
            options.scale,
            options.number?.gender,
            options.number?.ordinal,
        )
    case 'percentage':
        return writePercentage(
            integer,
            decimal,
            options.scale,
            options.number?.gender,
        )
    }
}

export default convert
