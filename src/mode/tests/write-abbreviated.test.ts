import test from 'ava'
import writeAbbreviated from '../write-abbreviated'
import Scales from '../../ts/enum/scales.enum'

test('writeAbbreviated(): should abbreviate thousands and larger values', (t) => {
    t.is(writeAbbreviated('1500'), '1,5 mil')
    t.is(writeAbbreviated('1500000'), '1,5 mi')
    t.is(writeAbbreviated('1500000000'), '1,5 bi')
    t.is(writeAbbreviated('1500000000000'), '1,5 tri')
})

test('writeAbbreviated(): should leave values below one thousand without a suffix', (t) => {
    t.is(writeAbbreviated('0'), '0')
    t.is(writeAbbreviated('42'), '42')
    t.is(writeAbbreviated('42', '50'), '42,5')
    t.is(writeAbbreviated('999', '99'), '999,99')
})

test('writeAbbreviated(): should round to one decimal place', (t) => {
    t.is(writeAbbreviated('1499'), '1,5 mil')
    t.is(writeAbbreviated('1449'), '1,4 mil')
    t.is(writeAbbreviated('1550'), '1,6 mil')
    t.is(writeAbbreviated('1499', '99'), '1,5 mil')
    t.is(writeAbbreviated('999999'), '1 mi')
})

test('writeAbbreviated(): should respect the selected scale', (t) => {
    t.is(writeAbbreviated('1500000000', '0', Scales.SHORT), '1,5 bi')
    t.is(writeAbbreviated('1500000000', '0', Scales.LONG), '1,5 mil mi')
    t.is(writeAbbreviated('1500000000000', '0', Scales.LONG), '1,5 bi')
})

test('writeAbbreviated(): should reject values beyond the scale limit', (t) => {
    t.throws(() => writeAbbreviated(`1${'0'.repeat(42)}`), {
        message: 'Number exceeds short scale limit',
    })
    t.throws(() => writeAbbreviated(`1${'0'.repeat(75)}`, '0', Scales.LONG), {
        message: 'Number exceeds long scale limit',
    })
})
