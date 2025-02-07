import test from 'ava'
import Scales from '../../../ts/enum/scales.enum'
import writeGreaterThan1000 from '../write-greater-than-1000'

test('writeGreaterThan1000(): short scale 1', (t) => {
    t.is(writeGreaterThan1000('1000'), 'mil')
    t.is(writeGreaterThan1000('1001'), 'mil e um')
    t.is(writeGreaterThan1000('2000'), 'dois mil')
    t.is(writeGreaterThan1000('2002'), 'dois mil e dois')
    t.is(writeGreaterThan1000('10500'), 'dez mil e quinhentos')
    t.is(writeGreaterThan1000('10520'), 'dez mil quinhentos e vinte')
    t.is(writeGreaterThan1000('1000000'), 'um milhão')
    t.is(writeGreaterThan1000('1000001'), 'um milhão e um')
    t.is(writeGreaterThan1000('2000000'), 'dois milhões')
    t.is(writeGreaterThan1000('2000002'), 'dois milhões e dois')
    t.is(writeGreaterThan1000('2150000001'), 'dois bilhões, cento e cinquenta milhões e um')
    t.is(writeGreaterThan1000('2150200050'), 'dois bilhões, cento e cinquenta milhões, duzentos mil e cinquenta')
    t.is(writeGreaterThan1000('1000000000000'), 'um trilhão')
    t.is(writeGreaterThan1000('1000000000001'), 'um trilhão e um')
    t.is(writeGreaterThan1000('2000000000002'), 'dois trilhões e dois')
})

test('writeGreaterThan1000(): long scale 1', (t) => {
    t.is(writeGreaterThan1000('1000', Scales.LONG), 'mil')
    t.is(writeGreaterThan1000('1001', Scales.LONG), 'mil e um')
    t.is(writeGreaterThan1000('2000', Scales.LONG), 'dois mil')
    t.is(writeGreaterThan1000('2002', Scales.LONG), 'dois mil e dois')
    t.is(writeGreaterThan1000('10500', Scales.LONG), 'dez mil e quinhentos')
    t.is(writeGreaterThan1000('10520', Scales.LONG), 'dez mil quinhentos e vinte')
    t.is(writeGreaterThan1000('1000000', Scales.LONG), 'um milhão')
    t.is(writeGreaterThan1000('1000001', Scales.LONG), 'um milhão e um')
    t.is(writeGreaterThan1000('2000000', Scales.LONG), 'dois milhões')
    t.is(writeGreaterThan1000('2000002', Scales.LONG), 'dois milhões e dois')
    t.is(writeGreaterThan1000('2150000001', Scales.LONG), 'dois mil milhões, cento e cinquenta milhões e um')
    t.is(writeGreaterThan1000('2150200050', Scales.LONG), 'dois mil milhões, cento e cinquenta milhões, duzentos mil e cinquenta')
    t.is(writeGreaterThan1000('1000000000000', Scales.LONG), 'um bilhão')
    t.is(writeGreaterThan1000('1000000000001', Scales.LONG), 'um bilhão e um')
    t.is(writeGreaterThan1000('2000000000002', Scales.LONG), 'dois bilhões e dois')
})

test('writeGreaterThan1000(): big numbers', (t) => {
    const error = t.throws(() => writeGreaterThan1000('1000000000000000000000000000000000000000000'))
    t.is(error?.message, `Number exceeds ${Scales.SHORT} scale limit`)
})
