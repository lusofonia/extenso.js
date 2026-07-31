import test from 'ava'
import Locales from '../locales.enum'

test('Locales enum values', t => {
    const values = Object.values(Locales)
    values.forEach(value => {
        t.true(value === value.toLowerCase(), `Value ${value} should be lowercase`)
        t.false(value.includes(' '), `Value ${value} should not contain spaces`)
        t.is(value.length, 2, `Value ${value} should be 2 characters long`)
    })
})
