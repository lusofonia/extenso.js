import test from 'ava'
import writeDecimal from '../write-decimal'

test('writeDecimal(): singular', (t) => {
    t.is(writeDecimal('1'), 'um décimo')
    t.is(writeDecimal('01'), 'um centésimo')
    t.is(writeDecimal('001'), 'um milésimo')
    t.is(writeDecimal('0001'), 'um décimo de milésimo')
    t.is(writeDecimal('00001'), 'um centésimo de milésimo')
    t.is(writeDecimal('000001'), 'um milionésimo')
})

test('writeDecimal(): plural', (t) => {
    t.is(writeDecimal('5'), 'cinco décimos')
    t.is(writeDecimal('05'), 'cinco centésimos')
    t.is(writeDecimal('005'), 'cinco milésimos')
    t.is(writeDecimal('0005'), 'cinco décimos de milésimo')
    t.is(writeDecimal('00005'), 'cinco centésimos de milésimo')
    t.is(writeDecimal('000005'), 'cinco milionésimos')
})

test('writeDecimal(): big numbers', (t) => {
    const error = t.throws(() => writeDecimal('0.000000000000000000000000000000000000000001'))
    t.is(error?.message, 'Number exceeds limit')
})
