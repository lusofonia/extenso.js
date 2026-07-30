import Currencies from '../ts/enum/currencies.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import Genders from '../ts/enum/genders.enum'
import Locales from '../ts/enum/locales.enum'
import Modes from '../ts/enum/modes.enum'
import Scales from '../ts/enum/scales.enum'
import Options from '../ts/interface/options.interface'
import Currency from '../ts/interface/currency.interface'

const assertEnumValue = <Value extends string>(
    name: string,
    value: unknown,
    allowed: Record<string, Value>,
): void => {
    if (value !== undefined && !Object.values(allowed).includes(value as Value)) {
        throw new TypeError(`Invalid ${name}: ${String(value)}`)
    }
}

const assertNonEmptyString = (name: string, value: unknown): void => {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError(`Invalid ${name}: expected a non-empty string`)
    }
}

const validateCustomCurrency = (currency: Record<string, unknown>): void => {
    if (currency.code !== undefined) {
        throw new TypeError('Invalid currency options: code cannot be combined with a custom currency')
    }

    assertNonEmptyString('currency.singular', currency.singular)
    assertNonEmptyString('currency.plural', currency.plural)
    assertEnumValue('currency.gender', currency.gender, Genders)

    if (currency.subunit === null ||
        typeof currency.subunit !== 'object' ||
        Array.isArray(currency.subunit)) {
        throw new TypeError('Invalid currency.subunit: expected an object')
    }

    const subunit = currency.subunit as Record<string, unknown>
    assertNonEmptyString('currency.subunit.singular', subunit.singular)
    assertNonEmptyString('currency.subunit.plural', subunit.plural)
    assertEnumValue('currency.subunit.gender', subunit.gender, Genders)
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

    const currency = options.currency as Currency | { code?: Currencies } | undefined
    if (currency && ('singular' in currency || 'plural' in currency ||
        'gender' in currency || 'subunit' in currency)) {
        validateCustomCurrency(currency as unknown as Record<string, unknown>)
    } else {
        assertEnumValue('currency.code', currency?.code, Currencies)
    }
    assertEnumValue('number.gender', options.number?.gender, Genders)
}

export default validateOptions
