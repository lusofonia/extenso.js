import test from 'ava'
import Modes from '../modes.enum'

test('Modes enum values', t => {
    const values = Object.values(Modes)
    values.forEach(value => {
        t.true(value === value.toLowerCase(), `Value ${value} should be lowercase`)
        t.false(value.includes(' '), `Value ${value} should not contain spaces`)
    })
})
