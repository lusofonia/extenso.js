import Modes from './ts/enum/modes.enum'
import Options from './ts/interface/options.interface'
import normalize from './utils/normalize'
import parse from './utils/parse'
import translate from './utils/translate'
import writeCurrency from './mode/write-currency'
import writeDigit from './mode/write-digit'
import writeNumber from './mode/write-number'
import detectCurrency from './utils/detect-currency'
import Currencies from './ts/enum/currencies.enum'
import DecimalSeparators from './ts/enum/decimal-separators.enum'
import validateOptions from './utils/validate-options'

const NEGATIVE_SIGN = '-'

/**
 * Converts a number to its written form in Portuguese
 * @param input - The number to convert (can be string, number, or bigint)
 * @param options - Configuration options for the conversion
 * @param options.mode - The conversion mode (CURRENCY, DIGIT, or NUMBER)
 * @param options.decimalSeparator - The decimal separator to use (POINT or COMMA)
 * @param options.locale - The locale to use for the output (BR or PT)
 * @param options.scale - The number scale to use (SHORT or LONG)
 * @param options.currency - Currency configuration when mode is CURRENCY
 * @param options.number - Number configuration when mode is NUMBER
 * @returns The written form of the number in Portuguese
 * @throws {TypeError} If input is not a string, number, or bigint
 * @throws {Error} If the number format is invalid
 * @throws {Error} If the number exceeds scale limits
 * @throws {Error} If an invalid currency code is provided
 * @example
 * extenso(1234.56) // "mil duzentos e trinta e quatro vírgula cinquenta e seis"
 * extenso(1234.56, { mode: Modes.CURRENCY, currency: { code: Currencies.BRL } }) // "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
 * extenso("R$ 1234.56", { mode: Modes.CURRENCY }) // "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
 */
const extenso = (input: number | string | bigint, options: Options = {}): string => {
    validateOptions(options)

    const inputIsNumber = typeof input === 'number'

    // Detect currency before normalizing input
    const detectedCurrency = typeof input === 'string' ? detectCurrency(input) : undefined
    const currencyCode = options?.currency?.code || detectedCurrency || Currencies.BRL
    const mode = options?.mode || (detectedCurrency || options?.currency?.code ? Modes.CURRENCY : Modes.NUMBER)

    // Now normalize and parse the input
    input = normalize(input)
    const parseSeparator = inputIsNumber ? DecimalSeparators.POINT : options?.decimalSeparator
    const decimalSeparator = parseSeparator === DecimalSeparators.COMMA ? ',' : '.'
    const hasDecimal = input.includes(decimalSeparator)
    const { integer, decimal } = parse(input, parseSeparator, mode === Modes.DIGIT)
    let text: string

    switch (mode) {
    case Modes.CURRENCY:
        if (decimal.length > 2) {
            throw new RangeError('Currency values must have zero, one, or two decimal places')
        }
        text = writeCurrency(integer, decimal, currencyCode, options?.scale)
        break
    case Modes.DIGIT:
        text = hasDecimal
            ? writeDigit(`${integer}${decimalSeparator}${decimal}`)
            : writeDigit(integer)
        break
    case Modes.NUMBER:
        text = writeNumber(integer, decimal, options?.scale, options?.number?.gender)
        break
    }

    text = translate(text, options?.locale)

    if (input.startsWith(NEGATIVE_SIGN)) {
        text = `menos ${text}`
    }

    return text
}

export default extenso
