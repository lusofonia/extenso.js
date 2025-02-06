import DecimalSeparators from '../ts/enum/decimal-separators.enum'

const parse = (input: string, decimalSeparator: DecimalSeparators = DecimalSeparators.POINT): {
    integer: string
    decimal: string
} => {
    input = input.trim()

    const separatorFor = {
        decimal: decimalSeparator === DecimalSeparators.POINT ? '.' : ',',
        thousands: decimalSeparator === DecimalSeparators.POINT ? ',' : '.',
    }

    if (input === '' || input.split(separatorFor.decimal)?.length > 2) {
        throw new Error('Invalid number')
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
        throw new Error('Invalid integer number')
    }
    if (!/^\d+$/.test(decimal)) {
        throw new Error('Invalid decimal number')
    }

    return {
        integer,
        decimal,
    }
}

export default parse