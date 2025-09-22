import { writeLowerThan10 } from '../core/integer/write-lower-than-1000'

/**
 * Writes each digit of a number separately in words
 * @param input - The number to write
 * @returns Each digit written in words, separated by spaces
 */
const writeDigit = (input: string): string => {
    const parts = input.split(/[.,]/)
    const integerPart = parts[0]
        .split('')
        .map((digit: string) => writeLowerThan10(Number(digit)))
        .join(' ')

    // Return only integer part if there's no decimal or decimal part is empty
    if (parts.length === 1 || !parts[1] || parts[1].trim() === '') {
        return integerPart
    }

    const decimalPart = parts[1]
        .split('')
        .map((digit: string) => writeLowerThan10(Number(digit)))
        .join(' ')

    return `${integerPart} vírgula ${decimalPart}`
}

export default writeDigit