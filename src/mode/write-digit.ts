import { writeLowerThan10 } from '../core/integer/write-lower-than-1000'

/**
 * Writes each digit of a number separately in words
 * @param input - The number to write
 * @returns Each digit written in words, separated by spaces
 */
const writeDigit = (input: string): string => {
    return input
        .split('')
        .map((part: string) => writeLowerThan10(Number(part)))
        .join(' ')
}

export default writeDigit