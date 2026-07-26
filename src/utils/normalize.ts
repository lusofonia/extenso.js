import { removeCurrencyMarkers } from './currency-markers'

const MAX_INPUT_LENGTH = 1000 // Maximum length for input strings to prevent memory issues

/**
 * Expands JavaScript scientific notation without performing floating-point
 * arithmetic or adding digits that were not present in the representation.
 * @param input - A finite number represented by JavaScript
 * @returns A plain decimal representation
 */
const expandExponential = (input: string): string => {
    const match = /^(-?)(\d+)(?:\.(\d+))?[eE]([+-]?\d+)$/.exec(input)

    if (!match) {
        return input
    }

    const [, sign, integer, fraction = '', exponentText] = match
    const exponent = Number(exponentText)
    const digits = `${integer}${fraction}`

    if (exponent < 0) {
        return `${sign}0.${'0'.repeat(Math.abs(exponent) - 1)}${digits}`
    }
    return `${sign}${digits}${'0'.repeat(exponent - fraction.length)}`
}

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
    if (typeof input === 'number' && !Number.isFinite(input)) {
        throw new RangeError('Input number must be finite')
    }

    const text = typeof input === 'number'
        ? expandExponential(input.toString())
        : input.toString()

    if (text.length > MAX_INPUT_LENGTH) {
        throw new Error(`Input exceeds maximum length of ${MAX_INPUT_LENGTH} characters`)
    }
    if (/^[+-]?(?:NaN|Infinity)$/.test(text.trim())) {
        throw new RangeError('Input number must be finite')
    }

    const normalized = removeCurrencyMarkers(text)
        .trim()
        .replace(/^-\s+/, '-')

    if (/\s/.test(normalized)) {
        throw new Error('Invalid number format: whitespace is not allowed within the number')
    }

    return normalized
}

export default normalize
