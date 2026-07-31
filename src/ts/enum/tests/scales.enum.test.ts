import test from 'ava'
import Scales from '../scales.enum'

test('Scales enum values', t => {
    const values = Object.values(Scales)
    values.forEach(value => {
        t.true(value === value.toLowerCase(), `Value ${value} should be lowercase`)
        t.false(value.includes(' '), `Value ${value} should not contain spaces`)
    })
})
