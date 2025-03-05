import test from 'ava'
import extenso from '../index'
import Modes from '../ts/enum/modes.enum'

test('extenso(): should handle default mode (NUMBER)', (t) => {
    t.is(extenso('1234.56'), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should handle negative numbers', (t) => {
    t.is(extenso('-1234.56'), 'menos mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
    t.is(extenso(-1234.56), 'menos mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should handle undefined number gender', (t) => {
    t.is(extenso('1234.56', { mode: Modes.NUMBER, number: {} }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
}) 