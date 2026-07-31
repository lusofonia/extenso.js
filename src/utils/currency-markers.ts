import Currencies from '../ts/enum/currencies.enum'
import type { CurrencyCode } from '../types'

export const currencySymbols: Readonly<Record<string, CurrencyCode>> = {
    'MOP$': Currencies.MOP,
    'R$': Currencies.BRL,
    '€': Currencies.EUR,
    '$': Currencies.USD,
    'Kz': Currencies.AOA,
    'Esc': Currencies.CVE,
    'CFA': Currencies.XOF,
    'MT': Currencies.MZN,
    'Db': Currencies.STN,
}

const escapeRegularExpression = (text: string): string => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const symbolPattern = Object.keys(currencySymbols)
    .sort((first, second) => second.length - first.length)
    .map(escapeRegularExpression)
    .join('|')
const codePattern = Object.values(Currencies).join('|')
const markerPattern = new RegExp(
    `${symbolPattern}|(?<![A-Za-z])(?:${codePattern})(?![A-Za-z])`,
    'g',
)

/**
 * Finds all supported currency markers without matching codes inside words.
 * Longer symbols are matched first so that MOP$ is never interpreted as USD.
 * @param input - Text that may contain currency codes or symbols
 * @returns Every detected currency in source order
 */
export const findCurrencies = (input: string): CurrencyCode[] => {
    return Array.from(input.matchAll(markerPattern), (match): CurrencyCode => {
        return currencySymbols[match[0]] ?? match[0] as CurrencyCode
    })
}

/**
 * Removes every supported currency marker from an input.
 * @param input - Text from which markers should be removed
 * @returns Text without supported currency markers
 */
export const removeCurrencyMarkers = (input: string): string => {
    return input.replace(markerPattern, ' ')
}
