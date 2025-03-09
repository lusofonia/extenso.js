import Currencies from '../../ts/enum/currencies.enum'

export interface CurrencyTestCase {
    input: string
    expectedCurrency: Currencies
    description: string
}

export const currencyTestCases: CurrencyTestCase[] = [
    // Currency codes with space
    { input: '123 BRL', expectedCurrency: Currencies.BRL, description: 'BRL code with space' },
    { input: '123 EUR', expectedCurrency: Currencies.EUR, description: 'EUR code with space' },
    { input: '123 USD', expectedCurrency: Currencies.USD, description: 'USD code with space' },
    { input: '123 AOA', expectedCurrency: Currencies.AOA, description: 'AOA code with space' },
    { input: '123 CVE', expectedCurrency: Currencies.CVE, description: 'CVE code with space' },
    { input: '123 XOF', expectedCurrency: Currencies.XOF, description: 'XOF code with space' },
    { input: '123 MZN', expectedCurrency: Currencies.MZN, description: 'MZN code with space' },
    { input: '123 STN', expectedCurrency: Currencies.STN, description: 'STN code with space' },
    { input: '123 MOP', expectedCurrency: Currencies.MOP, description: 'MOP code with space' },

    // Currency symbols with space
    { input: 'R$ 123', expectedCurrency: Currencies.BRL, description: 'BRL symbol with space' },
    { input: '€ 123', expectedCurrency: Currencies.EUR, description: 'EUR symbol with space' },
    { input: '$ 123', expectedCurrency: Currencies.USD, description: 'USD symbol with space' },
    { input: 'Kz 123', expectedCurrency: Currencies.AOA, description: 'AOA symbol with space' },
    { input: 'Esc 123', expectedCurrency: Currencies.CVE, description: 'CVE symbol with space' },
    { input: 'CFA 123', expectedCurrency: Currencies.XOF, description: 'XOF symbol with space' },
    { input: 'MT 123', expectedCurrency: Currencies.MZN, description: 'MZN symbol with space' },
    { input: 'Db 123', expectedCurrency: Currencies.STN, description: 'STN symbol with space' },
    { input: 'MOP$ 123', expectedCurrency: Currencies.MOP, description: 'MOP symbol with space' },

    // Currency codes without space
    { input: '123BRL', expectedCurrency: Currencies.BRL, description: 'BRL code without space' },
    { input: '123EUR', expectedCurrency: Currencies.EUR, description: 'EUR code without space' },
    { input: '123USD', expectedCurrency: Currencies.USD, description: 'USD code without space' },

    // Currency symbols without space
    { input: 'R$123', expectedCurrency: Currencies.BRL, description: 'BRL symbol without space' },
    { input: '€123', expectedCurrency: Currencies.EUR, description: 'EUR symbol without space' },
    { input: '$123', expectedCurrency: Currencies.USD, description: 'USD symbol without space' },

    // Different positions
    { input: 'BRL 123', expectedCurrency: Currencies.BRL, description: 'Currency code before number' },
    { input: '123 EUR 456', expectedCurrency: Currencies.EUR, description: 'Currency code in middle' },
    { input: '123 456 USD', expectedCurrency: Currencies.USD, description: 'Currency code at end' },

    // Multiple indicators (should use first occurrence)
    { input: 'BRL 123 EUR', expectedCurrency: Currencies.BRL, description: 'Multiple currency codes' },
    { input: 'R$ 123 €', expectedCurrency: Currencies.BRL, description: 'Multiple currency symbols' }
]

export const invalidCurrencyTestCases = [
    '123',
    '123.45',
    '123,45',
    '123 ABC',
    '123 XYZ',
    '',
    '0',
    '-123'
]

export const getFormattedAmount = (amount: string | number, currency: string): string => {
    return typeof amount === 'string' ? `${amount} ${currency}` : `${amount.toString()} ${currency}`
}

export const getFormattedAmountWithSymbol = (amount: string | number, symbol: string): string => {
    return typeof amount === 'string' ? `${symbol} ${amount}` : `${symbol} ${amount.toString()}`
} 