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
    if (!decimal) {
        decimal = '0'
    }
    if (!/^\d+$/.test(integer)) {
        throw new ParseError(
            `Invalid integer part: "${integer}". Only digits are allowed.`,
            ParseErrorCode.INVALID_INTEGER
        )
    }
    if (!/^\d+$/.test(decimal)) {
        throw new ParseError(
            `Invalid decimal part: "${decimal}". Only digits are allowed.`,
            ParseErrorCode.INVALID_DECIMAL
        )
    }

    return {
        integer,
        decimal,
    }
}

export default parse