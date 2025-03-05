import Currency from '../ts/interface/currency.interface'
import Currencies from '../ts/enum/currencies.enum'
import listCurrencies from '../lists/list-currencies'
import Scales from '../ts/enum/scales.enum'
import writeInteger from '../core/write-integer'

const ONE_MILION = 1000000

/**
 * Writes the unit part of a currency amount
 * @param unit - The unit part of the amount
 * @param currency - The currency configuration
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The unit part written in words with currency name
 */
export const writeUnit = (unit: string, currency: Currency, scale: Scales = Scales.SHORT) => {
    const text = writeInteger(unit, scale)

    if (Number(unit) === 1) {
        return `${text} ${currency.singular}`
    }
    if (Number(unit) >= ONE_MILION && Number(unit.slice(-6)) === 0) {
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

    if (Number(subunit) === 1) {
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
    subunit = subunit.padEnd(2, '0')

    if (!Object.keys(listCurrencies).includes(code)) {
        throw new Error('Invalid currency')
    }

    const currency = listCurrencies[code]
    const hasUnit = Number(unit) > 0
    const hasSubunit = Number(subunit) > 0

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