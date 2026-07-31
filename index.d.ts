export type ExtensoMode = 'number' | 'currency' | 'digit'
export type ExtensoLocale = 'pt' | 'br'
export type ExtensoScale = 'short' | 'long'
export type ExtensoGender = 'male' | 'female'
export type DecimalSeparator = 'comma' | 'point'
export type CurrencyCode =
    | 'AOA'
    | 'CVE'
    | 'BRL'
    | 'XOF'
    | 'MZN'
    | 'EUR'
    | 'STN'
    | 'USD'
    | 'MOP'

export interface CurrencyOptions {
    code?: CurrencyCode
}

export interface NumberOptions {
    gender?: ExtensoGender
}

export interface ExtensoOptions {
    mode?: ExtensoMode
    locale?: ExtensoLocale
    scale?: ExtensoScale
    decimalSeparator?: DecimalSeparator
    removeAccents?: boolean
    currency?: CurrencyOptions
    number?: NumberOptions
}

/**
 * Converts a number to its written form in Portuguese.
 * @param input The number to convert
 * @param options Output and parsing options
 * @returns The number written in Portuguese
 */
export default function extenso(
    input: string | number | bigint,
    options?: ExtensoOptions,
): string
