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

const MAX_INPUT_LENGTH = 1000 // Maximum length for input strings to prevent memory issues

/**
 * Normalizes the input by converting it to a string and removing currency symbols/codes
 * @param input - The input to normalize
 * @returns The normalized string
 * @throws {TypeError} If input is not a string, number, or bigint
 * @throws {Error} If the normalized string exceeds maximum length
 */
const normalize = (input: string | number | bigint): string => {
    if (typeof input === 'bigint') {
        input = input.toString()
    }
    if (typeof input !== 'string' && typeof input !== 'number') {
        throw new TypeError('Input must be a string, number or bigint')
    }

    let normalized = input.toString().trim().replace(/\s/g, '')
    
    // Remove currency symbols and codes
    for (const [symbol] of Object.entries(currencySymbols)) {
        normalized = normalized.replace(symbol, '')
    }
    for (const code of Object.values(Currencies)) {
        normalized = normalized.replace(code, '')
    }
    
    if (normalized.length > MAX_INPUT_LENGTH) {
        throw new Error(`Input exceeds maximum length of ${MAX_INPUT_LENGTH} characters`)
    }

    return normalized
}

export default normalize