import type { ExtensoOptions } from './types'
import normalize from './utils/normalize'
import parse from './utils/parse'
import translate from './utils/translate'
import DecimalSeparators from './ts/enum/decimal-separators.enum'
import Modes from './ts/enum/modes.enum'
import validateOptions from './utils/validate-options'
import removeAccents from './utils/remove-accents'
import convert from './core/convert'
import resolveConversion from './core/resolve-conversion'
import parseFraction from './utils/parse-fraction'
import formatTextCase from './utils/format-text-case'
import { getCurrency, getScaleLimit, listCurrencies } from './metadata'

export type {
    BuiltInCurrencyOptions,
    CurrencyCode,
    CurrencyDefinition,
    CurrencyFormattingOptions,
    CurrencyMetadata,
    CurrencyOptions,
    CurrencyRounding,
    DecimalSeparator,
    ExtensoGender,
    ExtensoLocale,
    ExtensoMode,
    ExtensoOptions,
    ExtensoScale,
    MeasurementUnit,
    NumberOptions,
    ScaleLimit,
    TextCase,
} from './types'

const NEGATIVE_SIGN = '-'

/**
 * Converts a number to its written form in Portuguese
 * @param input - The number to convert (can be string, number, or bigint)
 * @param options - Configuration options for the conversion
 * @param options.mode - The conversion mode
 * @param options.decimalSeparator - The decimal separator to use (POINT or COMMA)
 * @param options.locale - The locale to use for the output (BR or PT)
 * @param options.scale - The number scale to use (SHORT or LONG)
 * @param options.removeAccents - Whether to remove accents from the output
 * @param options.textCase - Capitalization applied to the final text
 * @param options.currency - Currency configuration when mode is CURRENCY
 * @param options.unit - Unit definition when mode is MEASUREMENT
 * @param options.number - Number configuration when mode is NUMBER
 * @param options.number.ordinal - Whether to write an integer as an ordinal
 * @returns The written form of the number in Portuguese
 * @throws {TypeError} If input is not a string, number, or bigint
 * @throws {Error} If the number format is invalid
 * @throws {Error} If the number exceeds scale limits
 * @throws {Error} If an invalid currency code is provided
 * @example
 * extenso(1234.56) // "mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos"
 * extenso(1234.56, { mode: Modes.CURRENCY, currency: { code: Currencies.BRL } }) // "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
 * extenso("R$ 1234.56", { mode: Modes.CURRENCY }) // "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
 */
const extenso = Object.assign((
    input: number | string | bigint,
    options: ExtensoOptions = {},
): string => {
    validateOptions(options)

    const inputIsNumber = typeof input === 'number'

    const { currency, mode } = resolveConversion(input, options)

    input = normalize(input)
    let isNonZero: boolean
    let text: string

    if (mode === Modes.FRACTION) {
        const { numerator, denominator } = parseFraction(input)
        isNonZero = /[1-9]/.test(numerator)
        text = convert({
            kind: 'fraction',
            numerator,
            denominator,
        }, mode, currency, options)
    } else {
        const parseSeparator = inputIsNumber ? DecimalSeparators.POINT : options?.decimalSeparator
        const decimalSeparator = parseSeparator === DecimalSeparators.COMMA ? ',' : '.'
        const hasDecimal = input.includes(decimalSeparator)
        const { integer, decimal } = parse(input, parseSeparator, mode === Modes.DIGIT)
        isNonZero = /[1-9]/.test(integer) || /[1-9]/.test(decimal)
        text = convert({
            kind: 'number',
            integer,
            decimal,
            decimalSeparator,
            hasDecimalSeparator: hasDecimal,
        }, mode, currency, options)
    }

    text = translate(text, options.locale)

    if (input.startsWith(NEGATIVE_SIGN) && isNonZero) {
        text = `menos ${text}`
    }

    if (options.removeAccents) {
        text = removeAccents(text)
    }
    if (options.textCase) {
        text = formatTextCase(text, options.textCase)
    }

    return text
}, {
    getCurrency,
    getScaleLimit,
    listCurrencies,
})

export default extenso
