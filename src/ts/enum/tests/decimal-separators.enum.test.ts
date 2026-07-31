import test from 'ava'
import DecimalSeparators from '../decimal-separators.enum'

test('DecimalSeparators enum values', t => {
    const values = Object.values(DecimalSeparators)
    values.forEach(value => {
        t.true(value === value.toLowerCase(), `Value ${value} should be lowercase`)
        t.false(value.includes(' '), `Value ${value} should not contain spaces`)
    })
})
