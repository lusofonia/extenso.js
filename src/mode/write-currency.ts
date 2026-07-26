import Currency from '../ts/interface/currency.interface'
import Currencies from '../ts/enum/currencies.enum'
import listCurrencies from '../lists/list-currencies'
import Scales from '../ts/enum/scales.enum'
import writeInteger from '../core/write-integer'

const ONE_MILLION = 1000000n

/**
 * Writes the unit part of a currency amount
 * @param unit - The unit part of the amount
 * @param currency - The currency configuration
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The unit part written in words with currency name
 */
export const writeUnit = (unit: string, currency: Currency, scale: Scales = Scales.SHORT) => {
    const text = writeInteger(unit, scale)
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
export const writeSubunit = (subunit: string, currency: Currency) => {
    const text = writeInteger(subunit.slice(0, 2))

    if (BigInt(subunit) === 1n) {
        return `${text} ${currency.subunit.singular}`
    }
    return `${text} ${currency.subunit.plural}`
}

/**
 * Writes a complete currency amount in words
 * @param unit - The unit part of the amount
 * @param subunit - The subunit part of the amount
 * @param code - The currency code
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The complete amount written in words with currency name
 * @throws {Error} If an invalid currency code is provided
 */
const writeCurrency = (
    unit: string,
    subunit = '0',
    code: Currencies = Currencies.BRL,
    scale: Scales = Scales.SHORT,
): string => {
    if (!/^\d+$/.test(unit) || !/^\d{1,2}$/.test(subunit)) {
        throw new Error('Currency values must have zero, one, or two decimal places')
    }
    subunit = subunit.padEnd(2, '0')

    if (!Object.keys(listCurrencies).includes(code)) {
        throw new Error('Invalid currency')
    }

    const currency = listCurrencies[code]
    const hasUnit = BigInt(unit) > 0n
    const hasSubunit = BigInt(subunit) > 0n

    if (!hasUnit && !hasSubunit) {
        return `zero ${currency.plural}`
    }
    if (!hasUnit) {
        return writeSubunit(subunit, currency)
    }
    if (!hasSubunit) {
        return writeUnit(unit, currency, scale)
    }
    return `${writeUnit(unit, currency, scale)} e ${writeSubunit(subunit, currency)}`
}

export default writeCurrency
