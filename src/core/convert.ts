import writeAbbreviated from '../mode/write-abbreviated'
import writeCurrency from '../mode/write-currency'
import writeDigit from '../mode/write-digit'
import writeFraction from '../mode/write-fraction'
import writeMeasurement from '../mode/write-measurement'
import writeNumber from '../mode/write-number'
import writePercentage from '../mode/write-percentage'
import quantizeCurrency from '../utils/quantize-currency'
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

interface ConversionResult {
    text: string
    isNonZero: boolean
}

/** Converts a parsed, unsigned number according to the selected output mode. */
const convert = (
    parsed: ParsedNumber | ParsedFraction,
    mode: ExtensoMode,
    currency: CurrencyCode | CurrencyDefinition,
    options: ExtensoOptions,
): ConversionResult => {
    if (parsed.kind === 'fraction') {
        return {
            text: writeFraction(parsed.numerator, parsed.denominator, options.scale),
            isNonZero: /[1-9]/.test(parsed.numerator),
        }
    }

    const { integer, decimal, decimalSeparator, hasDecimalSeparator } = parsed
    const numberMode = mode as Exclude<ExtensoMode, 'fraction'>
    let text: string

    switch (numberMode) {
    case 'abbreviated':
        text = writeAbbreviated(integer, decimal, options.scale)
        break
    case 'currency':
    {
        const fractionDigits = typeof currency === 'string'
            ? 2
            : currency.fractionDigits ?? 2
        const quantized = quantizeCurrency(
            integer,
            hasDecimalSeparator ? decimal : '',
            fractionDigits,
            options.currency?.rounding,
        )

        return {
            text: writeCurrency(
                quantized.unit,
                quantized.subunit,
                currency,
                options.scale,
                {
                    fractionDigits,
                    showZeroSubunit: options.currency?.showZeroSubunit,
                    showZeroUnit: options.currency?.showZeroUnit,
                },
            ),
            isNonZero: /[1-9]/.test(quantized.unit) || /[1-9]/.test(quantized.subunit),
        }
    }
    case 'digit':
        text = hasDecimalSeparator
            ? writeDigit(`${integer}${decimalSeparator}${decimal}`)
            : writeDigit(integer)
        break
    case 'measurement':
        text = writeMeasurement(integer, decimal, options.unit, options.scale)
        break
    case 'number':
        text = writeNumber(
            integer,
            decimal,
            options.scale,
            options.number?.gender,
            options.number?.ordinal,
        )
        break
    case 'percentage':
        text = writePercentage(
            integer,
            decimal,
            options.scale,
            options.number?.gender,
        )
        break
    }

    return { text, isNonZero: /[1-9]/.test(integer) || /[1-9]/.test(decimal) }
}

export default convert
