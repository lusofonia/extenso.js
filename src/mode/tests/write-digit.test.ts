import test from 'ava'
import writeDigit from '../write-digit'

test('writeDigit(): should write digits as words', (t) => {
    t.is(writeDigit('1'), 'um')
    t.is(writeDigit('12'), 'um dois')
    t.is(writeDigit('123'), 'um dois três')
    t.is(writeDigit('98765'), 'nove oito sete seis cinco')
    t.is(writeDigit('43210'), 'quatro três dois um zero')
})
