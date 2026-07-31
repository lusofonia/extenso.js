import test from 'ava'
import Genders from '../genders.enum'

test('Genders enum values', t => {
    const values = Object.values(Genders)
    values.forEach(value => {
        t.true(value === value.toLowerCase(), `Value ${value} should be lowercase`)
        t.false(value.includes(' '), `Value ${value} should not contain spaces`)
    })
})
