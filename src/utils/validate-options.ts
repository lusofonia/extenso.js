import Currencies from '../ts/enum/currencies.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import Genders from '../ts/enum/genders.enum'
import Locales from '../ts/enum/locales.enum'
import Modes from '../ts/enum/modes.enum'
import Scales from '../ts/enum/scales.enum'
import Options from '../ts/interface/options.interface'

const assertEnumValue = <Value extends string>(
    name: string,
    value: unknown,
    allowed: Record<string, Value>,
): void => {
    if (value !== undefined && !Object.values(allowed).includes(value as Value)) {
        throw new TypeError(`Invalid ${name}: ${String(value)}`)
    }
}

/**
 * Validates every public option at runtime.
 * @param options - Options supplied to the public API
 * @throws {TypeError} If an option has an unsupported value
 */
const validateOptions = (options: Options): void => {
    if (options === null || typeof options !== 'object' || Array.isArray(options)) {
        throw new TypeError('Options must be an object')
    }

    assertEnumValue('mode', options.mode, Modes)
    assertEnumValue('locale', options.locale, Locales)
    assertEnumValue('scale', options.scale, Scales)
    assertEnumValue('decimalSeparator', options.decimalSeparator, DecimalSeparators)

    if (options.currency !== undefined &&
        (options.currency === null || typeof options.currency !== 'object' || Array.isArray(options.currency))) {
        throw new TypeError('Invalid currency options: expected an object')
    }
    if (options.number !== undefined &&
        (options.number === null || typeof options.number !== 'object' || Array.isArray(options.number))) {
        throw new TypeError('Invalid number options: expected an object')
    }

    assertEnumValue('currency.code', options.currency?.code, Currencies)
    assertEnumValue('number.gender', options.number?.gender, Genders)
    if (options.number?.ordinal !== undefined && typeof options.number.ordinal !== 'boolean') {
        throw new TypeError(`Invalid number.ordinal: ${String(options.number.ordinal)}`)
    }
}

export default validateOptions
