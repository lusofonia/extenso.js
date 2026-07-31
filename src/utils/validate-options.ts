import Currencies from '../ts/enum/currencies.enum'
import CurrencyRoundings from '../ts/enum/currency-roundings.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import Genders from '../ts/enum/genders.enum'
import Locales from '../ts/enum/locales.enum'
import Modes from '../ts/enum/modes.enum'
import Scales from '../ts/enum/scales.enum'
import Options from '../ts/interface/options.interface'

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
}

const assertEnumValue = <Value extends string>(
    name: string,
    value: unknown,
    allowed: Record<string, Value>,
): void => {
    if (value !== undefined && !Object.values(allowed).includes(value as Value)) {
        throw new TypeError(`Invalid ${name}: ${String(value)}`)
    }
}

const assertRequiredEnumValue = <Value extends string>(
    name: string,
    value: unknown,
    allowed: Record<string, Value>,
): void => {
    if (value === undefined || !Object.values(allowed).includes(value as Value)) {
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
    assertRequiredEnumValue('currency.gender', currency.gender, Genders)

    if (!isRecord(currency.subunit)) {
        throw new TypeError('Invalid currency.subunit: expected an object')
    }

    const subunit = currency.subunit
    assertNonEmptyString('currency.subunit.singular', subunit.singular)
    assertNonEmptyString('currency.subunit.plural', subunit.plural)
    assertRequiredEnumValue('currency.subunit.gender', subunit.gender, Genders)

    if (currency.fractionDigits !== undefined &&
        (typeof currency.fractionDigits !== 'number' ||
            !Number.isInteger(currency.fractionDigits) ||
            currency.fractionDigits < 0 ||
            currency.fractionDigits > 1000)) {
        throw new TypeError('Invalid currency.fractionDigits: expected an integer from 0 to 1000')
    }
}

/**
 * Validates every public option at runtime.
 * @param options - Options supplied to the public API
 * @throws {TypeError} If an option has an unsupported value
 */
const validateOptions: (options: unknown) => asserts options is Options = (options) => {
    if (!isRecord(options)) {
        throw new TypeError('Options must be an object')
    }

    assertEnumValue('mode', options.mode, Modes)
    assertEnumValue('locale', options.locale, Locales)
    assertEnumValue('scale', options.scale, Scales)
    assertEnumValue('decimalSeparator', options.decimalSeparator, DecimalSeparators)

    if (options.removeAccents !== undefined && typeof options.removeAccents !== 'boolean') {
        throw new TypeError(`Invalid removeAccents: ${String(options.removeAccents)}`)
    }

    if (options.currency !== undefined && !isRecord(options.currency)) {
        throw new TypeError('Invalid currency options: expected an object')
    }
    if (options.number !== undefined && !isRecord(options.number)) {
        throw new TypeError('Invalid number options: expected an object')
    }
    if (options.unit !== undefined && !isRecord(options.unit)) {
        throw new TypeError('Invalid unit options: expected an object')
    }
    if (options.mode === Modes.MEASUREMENT && options.unit === undefined) {
        throw new TypeError('Measurement mode requires unit options')
    }
    if (options.unit) {
        assertNonEmptyString('unit.singular', options.unit.singular)
        assertNonEmptyString('unit.plural', options.unit.plural)
        assertRequiredEnumValue('unit.gender', options.unit.gender, Genders)
    }

    const currency = options.currency
    assertEnumValue('currency.rounding', currency?.rounding, CurrencyRoundings)
    for (const field of ['showZeroUnit', 'showZeroSubunit'] as const) {
        if (currency?.[field] !== undefined && typeof currency[field] !== 'boolean') {
            throw new TypeError(`Invalid currency.${field}: ${String(currency[field])}`)
        }
    }
    if (currency && ('singular' in currency || 'plural' in currency ||
        'gender' in currency || 'subunit' in currency)) {
        validateCustomCurrency(currency)
    } else {
        assertEnumValue('currency.code', currency?.code, Currencies)
        if (currency?.fractionDigits !== undefined) {
            throw new TypeError('currency.fractionDigits is only supported for custom currencies')
        }
    }
    const number = options.number
    assertEnumValue('number.gender', number?.gender, Genders)
    if (number?.ordinal !== undefined && typeof number.ordinal !== 'boolean') {
        throw new TypeError(`Invalid number.ordinal: ${String(number.ordinal)}`)
    }
}

export default validateOptions
