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
 * Only allows currency codes/symbols at the beginning or end of the string
 * @param input - The input string to check for currency
 * @returns The detected currency code or undefined if none found
 */
const detectCurrency = (input: string): Currencies | undefined => {
    const trimmedInput = input.trim()
    
    // First check for currency codes (e.g. BRL, EUR, USD)
    for (const code of Object.values(Currencies)) {
        // Check if code is at the beginning (with optional space)
        if (trimmedInput.match(new RegExp(`^${code}\\s`)) || 
            trimmedInput.match(new RegExp(`^${code}$`))) {
            return code
        }
        // Check if code is at the end (with optional space)
        if (trimmedInput.match(new RegExp(`\\s${code}$`)) || 
            trimmedInput.match(new RegExp(`^${code}$`))) {
            return code
        }
    }

    // Then check for currency symbols
    for (const [symbol, code] of Object.entries(currencySymbols)) {
        // Escape special regex characters in symbol
        const escapedSymbol = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        
        // Check if symbol is at the beginning (with optional space)
        if (trimmedInput.match(new RegExp(`^${escapedSymbol}\\s`)) || 
            trimmedInput.match(new RegExp(`^${escapedSymbol}$`))) {
            return code
        }
        // Check if symbol is at the end (with optional space)
        if (trimmedInput.match(new RegExp(`\\s${escapedSymbol}$`)) || 
            trimmedInput.match(new RegExp(`^${escapedSymbol}$`))) {
            return code
        }
    }

    return undefined
}

export default detectCurrency