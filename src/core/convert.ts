import writeAbbreviated from '../mode/write-abbreviated'
import writeCurrency from '../mode/write-currency'
import writeDigit from '../mode/write-digit'
import writeNumber from '../mode/write-number'
import writePercentage from '../mode/write-percentage'
import type {
    CurrencyCode,
    CurrencyDefinition,
    ExtensoMode,
    ExtensoOptions,
} from '../types'

interface ParsedNumber {
    integer: string
    decimal: string
    decimalSeparator: ',' | '.'
    hasDecimalSeparator: boolean
}

/** Converts a parsed, unsigned number according to the selected output mode. */
const convert = (
    parsed: ParsedNumber,
    mode: ExtensoMode,
    currency: CurrencyCode | CurrencyDefinition,
    options: ExtensoOptions,
): string => {
    const { integer, decimal, decimalSeparator, hasDecimalSeparator } = parsed

    switch (mode) {
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
