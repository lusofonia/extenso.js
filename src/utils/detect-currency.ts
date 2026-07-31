import { findCurrencies } from './currency-markers'
import type { CurrencyCode } from '../types'

/**
 * Detects currency code or symbol in the input string
 * @param input - The input string to check for currency
 * @returns The detected currency code or undefined if none found
 * @throws {Error} If markers for more than one currency are present
 */
const detectCurrency = (input: string): CurrencyCode | undefined => {
    const currencies = [...new Set(findCurrencies(input))]

    if (currencies.length > 1) {
        throw new Error(`Conflicting currency markers: ${currencies.join(', ')}`)
    }

    return currencies[0]
}

export default detectCurrency
