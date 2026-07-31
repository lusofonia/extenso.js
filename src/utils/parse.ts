import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import type { DecimalSeparator } from '../types'

export enum ParseErrorCode {
    INVALID_NUMBER = 'INVALID_NUMBER',
    INVALID_INTEGER = 'INVALID_INTEGER',
    INVALID_DECIMAL = 'INVALID_DECIMAL',
    MULTIPLE_DECIMALS = 'MULTIPLE_DECIMALS',
    INVALID_GROUPING = 'INVALID_GROUPING',
    INCOMPLETE_DECIMAL = 'INCOMPLETE_DECIMAL',
    EMPTY_INPUT = 'EMPTY_INPUT',
}

export class ParseError extends Error {
    constructor(message: string, public code: ParseErrorCode) {
        super(message)
        this.name = 'ParseError'
    }
}

/**
 * Parses a string input into integer and decimal parts
 * @param input - The string to parse
 * @param decimalSeparator - The decimal separator to use (POINT or COMMA)
 * @param preserveLeadingZeros - Whether to preserve leading zeros in the integer part
 * @returns Object containing integer and decimal parts as strings
 * @throws {ParseError} If input is empty
 * @throws {ParseError} If multiple decimal separators are found
 * @throws {ParseError} If integer part contains non-digit characters
 * @throws {ParseError} If decimal part contains non-digit characters
 */
const parse = (
    input: string,
    decimalSeparator: DecimalSeparator = DecimalSeparators.POINT,
    preserveLeadingZeros = false,
): {
    integer: string
    decimal: string
} => {
    input = input.trim()

    const separatorFor = {
        decimal: decimalSeparator === DecimalSeparators.POINT ? '.' : ',',
        thousands: decimalSeparator === DecimalSeparators.POINT ? ',' : '.',
    }

    if (input === '') {
        throw new ParseError('Input cannot be empty', ParseErrorCode.EMPTY_INPUT)
    }
    if (input === '-') {
        throw new ParseError('A negative sign must be followed by a number', ParseErrorCode.INVALID_NUMBER)
    }
    if (!/^-?[^-]+$/.test(input)) {
        throw new ParseError(
            'Invalid number format: the negative sign is only allowed at the beginning.',
            ParseErrorCode.INVALID_NUMBER,
        )
    }

    const unsignedInput = input.startsWith('-') ? input.slice(1) : input
    const decimalParts = unsignedInput.split(separatorFor.decimal)

    if (decimalParts.length > 2) {
        throw new ParseError(
            `Invalid number format: multiple decimal separators found. Use only one '${separatorFor.decimal}' as decimal separator.`,
            ParseErrorCode.MULTIPLE_DECIMALS,
        )
    }
    if (decimalParts.length === 2 && decimalParts[1] === '') {
        throw new ParseError(
            'Invalid number format: decimal separator must be followed by digits.',
            ParseErrorCode.INCOMPLETE_DECIMAL,
        )
    }

    const [groupedInteger, decimal] = decimalParts
    let integer = groupedInteger

    if (integer.includes(separatorFor.thousands)) {
        const groups = integer.split(separatorFor.thousands)
        const validGrouping = /^\d{1,3}$/.test(groups[0]) &&
            groups.slice(1).every((group) => /^\d{3}$/.test(group))

        if (!validGrouping) {
            throw new ParseError(
                `Invalid thousands grouping for separator '${separatorFor.thousands}'.`,
                ParseErrorCode.INVALID_GROUPING,
            )
        }
        integer = groups.join('')
    }

    if (!integer) {
        integer = '0'
    }
    if (!/^\d+$/.test(integer)) {
        throw new ParseError(
            `Invalid integer part: "${integer}". Only digits are allowed.`,
            ParseErrorCode.INVALID_INTEGER,
        )
    }
    if (decimal && !/^\d+$/.test(decimal)) {
        throw new ParseError(
            `Invalid decimal part: "${decimal}". Only digits are allowed.`,
            ParseErrorCode.INVALID_DECIMAL,
        )
    }

    return {
        integer: preserveLeadingZeros ? integer : integer.replace(/^0+(?=\d)/, ''),
        decimal: decimal || '0',
    }
}

export default parse
