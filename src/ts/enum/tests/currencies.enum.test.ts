import test from 'ava'
import Currencies from '../currencies.enum'

test('Currencies enum values', t => {
    const values = Object.values(Currencies)
    values.forEach(value => {
        t.true(value === value.toUpperCase(), `Currency ${value} should be uppercase`)
        t.is(value.length, 3, `Currency ${value} should be 3 characters long`)
        t.false(value.includes(' '), `Currency ${value} should not contain spaces`)
    })
})
