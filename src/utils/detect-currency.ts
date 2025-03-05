import Currencies from '../ts/enum/currencies.enum'

const currencySymbols: Record<string, Currencies> = {
    'R$': Currencies.BRL,
    '€': Currencies.EUR,
    '$': Currencies.USD,
    'Kz': Currencies.AOA,
    'Esc': Currencies.CVE,
    'CFA': Currencies.XOF,
    'MT': Currencies.MZN,
    'Db': Currencies.STN,
    'MOP$': Currencies.MOP,
}

/**
 * Detects currency code or symbol in the input string
 * @param input - The input string to check for currency
 * @returns The detected currency code or undefined if none found
 */
const detectCurrency = (input: string): Currencies | undefined => {
    // First check for currency codes (e.g. BRL, EUR, USD)
    for (const code of Object.values(Currencies)) {
        if (input.includes(code)) {
            return code
        }
    }

    // Then check for currency symbols
    for (const [symbol, code] of Object.entries(currencySymbols)) {
        if (input.includes(symbol)) {
            return code
        }
    }

    return undefined
}

export default detectCurrency 