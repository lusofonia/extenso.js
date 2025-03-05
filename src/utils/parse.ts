import DecimalSeparators from '../ts/enum/decimal-separators.enum'

export enum ParseErrorCode {
    INVALID_NUMBER = 'INVALID_NUMBER',
    INVALID_INTEGER = 'INVALID_INTEGER',
    INVALID_DECIMAL = 'INVALID_DECIMAL',
    MULTIPLE_DECIMALS = 'MULTIPLE_DECIMALS',
    EMPTY_INPUT = 'EMPTY_INPUT'
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
 * @returns Object containing integer and decimal parts as strings
 * @throws {ParseError} If input is empty
 * @throws {ParseError} If multiple decimal separators are found
 * @throws {ParseError} If integer part contains non-digit characters
 * @throws {ParseError} If decimal part contains non-digit characters
 */
const parse = (input: string, decimalSeparator: DecimalSeparators = DecimalSeparators.POINT): {
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

    if (input.split(separatorFor.decimal)?.length > 2) {
        throw new ParseError(
            `Invalid number format: multiple decimal separators found. Use only one '${separatorFor.decimal}' as decimal separator.`,
            ParseErrorCode.MULTIPLE_DECIMALS
        )
    }

    let [integer, decimal] = input
        .replace(RegExp(`(^-|\\${separatorFor.thousands})`, 'g'), '')
        .trim()
        .split(separatorFor.decimal)
        .map((number) => number.replace(/^0+$/, '0'))

    if (!integer) {
        integer = '0'
    }
    if (!/^\d+$/.test(integer)) {
        throw new ParseError(
            `Invalid integer part: "${integer}". Only digits are allowed.`,
            ParseErrorCode.INVALID_INTEGER
        )
    }
    if (decimal && !/^\d+$/.test(decimal)) {
        throw new ParseError(
            `Invalid decimal part: "${decimal}". Only digits are allowed.`,
            ParseErrorCode.INVALID_DECIMAL
        )
    }

    return {
        integer,
        decimal: decimal || '0',
    }
}

export default parse