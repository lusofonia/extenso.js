import Currencies from './ts/enum/currencies.enum'
import Scales from './ts/enum/scales.enum'
import listCurrenciesData from './lists/list-currencies'
import listFrom1000 from './lists/list-from-1000'
import { currencySymbols } from './utils/currency-markers'
import type {
    CurrencyCode,
    CurrencyMetadata,
    ExtensoScale,
    ScaleLimit,
} from './types'

const isCurrencyCode = (value: unknown): value is CurrencyCode => {
    return typeof value === 'string' && Object.values(Currencies).some(code => code === value)
}

const isScale = (value: unknown): value is ExtensoScale => {
    return typeof value === 'string' && Object.values(Scales).some(scale => scale === value)
}

const currencyMetadata = (code: CurrencyCode): CurrencyMetadata => {
    const currency = listCurrenciesData[code]
    const symbols = Object.entries(currencySymbols)
        .filter(([, currencyCode]) => currencyCode === code)
        .map(([symbol]) => symbol)

    return {
        code,
        fractionDigits: 2,
        gender: currency.gender,
        plural: currency.plural,
        singular: currency.singular,
        subunit: { ...currency.subunit },
        symbols,
    }
}

/** Returns fresh metadata objects for every built-in currency. */
export const listCurrencies = (): CurrencyMetadata[] => {
    return Object.values(Currencies).map(currencyMetadata)
}

/** Returns metadata for one built-in currency. */
export const getCurrency = (code: CurrencyCode): CurrencyMetadata => {
    if (!isCurrencyCode(code)) {
        throw new TypeError(`Invalid currency code: ${String(code)}`)
    }
    return currencyMetadata(code)
}

/** Returns exact supported boundaries for a number scale. */
export const getScaleLimit = (scale: ExtensoScale = Scales.SHORT): ScaleLimit => {
    if (!isScale(scale)) {
        throw new TypeError(`Invalid scale: ${String(scale)}`)
    }

    const largestNamedExponent = listFrom1000[scale].length * 3
    const maximumDigits = largestNamedExponent + 3

    return {
        largestNamedExponent,
        maximum: '9'.repeat(maximumDigits),
        maximumDigits,
        scale,
    }
}
