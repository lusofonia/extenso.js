import test from 'ava'
import parse, { ParseError, ParseErrorCode } from '../parse'
import DecimalSeparators from '../../ts/enum/decimal-separators.enum'

test('parse(): should handle integer values', (t) => {
    t.deepEqual(parse('0'), { integer: '0', decimal: '0' })
    t.deepEqual(parse('1'), { integer: '1', decimal: '0' })
    t.deepEqual(parse('10'), { integer: '10', decimal: '0' })
    t.deepEqual(parse('100'), { integer: '100', decimal: '0' })
    t.deepEqual(parse('-1'), { integer: '1', decimal: '0' })
    t.deepEqual(parse('-10'), { integer: '10', decimal: '0' })
    t.deepEqual(parse('-100'), { integer: '100', decimal: '0' })
    t.deepEqual(parse('  -1'), { integer: '1', decimal: '0' })
    t.throws(() => parse('-  10'), { code: ParseErrorCode.INVALID_INTEGER })
    t.deepEqual(parse('   -100'), { integer: '100', decimal: '0' })
})

test('parse(): should handle decimal values', (t) => {
    t.deepEqual(parse('.5'), { integer: '0', decimal: '5' })
    t.deepEqual(parse('0.5'), { integer: '0', decimal: '5' })
    t.deepEqual(parse('1.5'), { integer: '1', decimal: '5' })
    t.deepEqual(parse('1.50'), { integer: '1', decimal: '50' })
    t.deepEqual(parse('1.05'), { integer: '1', decimal: '05' })
    t.deepEqual(parse('10.5'), { integer: '10', decimal: '5' })
    t.deepEqual(parse('100.05'), { integer: '100', decimal: '05' })
    t.deepEqual(parse('-1.5'), { integer: '1', decimal: '5' })
    t.deepEqual(parse('-10.5'), { integer: '10', decimal: '5' })
    t.deepEqual(parse('-100.05'), { integer: '100', decimal: '05' })
    t.deepEqual(parse('-.5'), { integer: '0', decimal: '5' })
    t.deepEqual(parse('-1.5  '), { integer: '1', decimal: '5' })
    t.deepEqual(parse('  -10.5'), { integer: '10', decimal: '5' })
    t.throws(() => parse('-  100.05'), { code: ParseErrorCode.INVALID_INTEGER })
    t.throws(() => parse('   - .5'), { code: ParseErrorCode.INVALID_INTEGER })
})

test('parse(): should handle string values with different decimal separators', (t) => {
    t.deepEqual(parse('1,5', DecimalSeparators.COMMA), { integer: '1', decimal: '5' })
    t.deepEqual(parse('1,50', DecimalSeparators.COMMA), { integer: '1', decimal: '50' })
    t.deepEqual(parse('1,05', DecimalSeparators.COMMA), { integer: '1', decimal: '05' })
    t.deepEqual(parse('10,5', DecimalSeparators.COMMA), { integer: '10', decimal: '5' })
    t.deepEqual(parse('100,05', DecimalSeparators.COMMA), { integer: '100', decimal: '05' })
})

test('parse(): should handle invalid input', (t) => {
    const invalidInteger = t.throws(() => parse('invalid')) as ParseError
    t.is(invalidInteger.message, 'Invalid integer part: "invalid". Only digits are allowed.')
    t.is(invalidInteger.code, ParseErrorCode.INVALID_INTEGER)

    const misplacedSign = t.throws(() => parse('12.34-56')) as ParseError
    t.is(misplacedSign.message, 'Invalid number format: the negative sign is only allowed at the beginning.')
    t.is(misplacedSign.code, ParseErrorCode.INVALID_NUMBER)

    const invalidDecimal = t.throws(() => parse('12.abc')) as ParseError
    t.is(invalidDecimal.message, 'Invalid decimal part: "abc". Only digits are allowed.')
    t.is(invalidDecimal.code, ParseErrorCode.INVALID_DECIMAL)

    const multipleDecimals = t.throws(() => parse('12.34.56')) as ParseError
    t.is(multipleDecimals.message, 'Invalid number format: multiple decimal separators found. Use only one \'.\' as decimal separator.')
    t.is(multipleDecimals.code, ParseErrorCode.MULTIPLE_DECIMALS)

    const emptyInput = t.throws(() => parse('')) as ParseError
    t.is(emptyInput.message, 'Input cannot be empty')
    t.is(emptyInput.code, ParseErrorCode.EMPTY_INPUT)
})

test('parse(): should validate grouping and incomplete values', (t) => {
    t.deepEqual(parse('1,234,567.89'), { integer: '1234567', decimal: '89' })
    t.deepEqual(parse('1.234.567,89', DecimalSeparators.COMMA), {
        integer: '1234567',
        decimal: '89',
    })
    t.deepEqual(parse('000123.0500'), { integer: '123', decimal: '0500' })

    t.throws(() => parse('1,23,456'), { code: ParseErrorCode.INVALID_GROUPING })
    t.throws(() => parse('12,34'), { code: ParseErrorCode.INVALID_GROUPING })
    t.throws(() => parse('1.23.456'), { code: ParseErrorCode.MULTIPLE_DECIMALS })
    t.throws(() => parse('-'), { code: ParseErrorCode.INVALID_NUMBER })
    t.throws(() => parse('1.'), { code: ParseErrorCode.INCOMPLETE_DECIMAL })
    t.throws(() => parse('1,', DecimalSeparators.COMMA), {
        code: ParseErrorCode.INCOMPLETE_DECIMAL,
    })
})
