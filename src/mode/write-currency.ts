import Currency from '../ts/interface/currency.interface'
import Currencies from '../ts/enum/currencies.enum'
import listCurrencies from '../lists/list-currencies'
import Scales from '../ts/enum/scales.enum'
import writeInteger from '../core/write-integer'
import type { CurrencyCode, ExtensoScale } from '../types'

const ONE_MILLION = 1000000n

interface CurrencyWriteOptions {
    fractionDigits?: number
    showZeroSubunit?: boolean
    showZeroUnit?: boolean
}

/**
 * Writes the unit part of a currency amount
 * @param unit - The unit part of the amount
 * @param currency - The currency configuration
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The unit part written in words with currency name
 */
export const writeUnit = (unit: string, currency: Currency, scale: ExtensoScale = Scales.SHORT) => {
    const text = writeInteger(unit, scale, currency.gender)
    const unitValue = BigInt(unit)

    if (unitValue === 1n) {
        return `${text} ${currency.singular}`
    }
    if (unitValue >= ONE_MILLION && unitValue % ONE_MILLION === 0n) {
        return `${text} de ${currency.plural}`
    }
    return `${text} ${currency.plural}`
}

/**
 * Writes the subunit part of a currency amount
 * @param subunit - The subunit part of the amount
 * @param currency - The currency configuration
 * @returns The subunit part written in words with currency name
 */
export const writeSubunit = (
    subunit: string,
    currency: Currency,
    scale: ExtensoScale = Scales.SHORT,
) => {
    const text = writeInteger(subunit, scale, currency.subunit.gender)

    if (BigInt(subunit) === 1n) {
        return `${text} ${currency.subunit.singular}`
    }
    return `${text} ${currency.subunit.plural}`
}

/**
 * Writes a complete currency amount in words
 * @param unit - The unit part of the amount
 * @param subunit - The subunit part of the amount
 * @param currencyOrCode - A supported currency code or a custom currency definition
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The complete amount written in words with currency name
 * @throws {Error} If an invalid currency code is provided
 */
const writeCurrency = (
    unit: string,
    subunit = '0',
    currencyOrCode: CurrencyCode | Currency = Currencies.BRL,
    scale: ExtensoScale = Scales.SHORT,
    options: CurrencyWriteOptions = {},
): string => {
    const fractionDigits = options.fractionDigits ?? 2
    const validSubunit = /^\d+$/.test(subunit) &&
        (fractionDigits === 0 ? subunit === '0' : subunit.length <= fractionDigits)

    if (!/^\d+$/.test(unit) || !validSubunit) {
        const message = fractionDigits === 2
            ? 'Currency values must have zero, one, or two decimal places'
            : `Currency values must have at most ${fractionDigits} decimal places`
        throw new Error(message)
    }
    subunit = fractionDigits === 0 ? '0' : subunit.padEnd(fractionDigits, '0')

    let currency: Currency
    if (typeof currencyOrCode === 'string') {
        if (!Object.keys(listCurrencies).includes(currencyOrCode)) {
            throw new Error('Invalid currency')
        }
        currency = listCurrencies[currencyOrCode]
    } else {
        currency = currencyOrCode
    }
    const hasUnit = BigInt(unit) > 0n
    const hasSubunit = BigInt(subunit) > 0n
    const includeUnit = hasUnit || options.showZeroUnit === true
    const includeSubunit = hasSubunit || options.showZeroSubunit === true

    if (!includeUnit && !includeSubunit) {
        return `zero ${currency.plural}`
    }

    const parts: string[] = []
    if (includeUnit) {
        parts.push(writeUnit(unit, currency, scale))
    }
    if (includeSubunit) {
        parts.push(writeSubunit(subunit, currency, scale))
    }
    return parts.join(' e ')
}

export default writeCurrency
