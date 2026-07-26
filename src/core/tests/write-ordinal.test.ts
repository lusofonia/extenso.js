import test from 'ava'
import writeOrdinal, { writeOrdinalLowerThan1000 } from '../write-ordinal'
import Genders from '../../ts/enum/genders.enum'
import Scales from '../../ts/enum/scales.enum'

test('writeOrdinalLowerThan1000(): should handle ordinal values', (t) => {
    t.is(writeOrdinalLowerThan1000(1), 'primeiro')
    t.is(writeOrdinalLowerThan1000(11), 'décimo primeiro')
    t.is(writeOrdinalLowerThan1000(42), 'quadragésimo segundo')
    t.is(writeOrdinalLowerThan1000(100), 'centésimo')
    t.is(writeOrdinalLowerThan1000(999), 'nongentésimo nonagésimo nono')
})

test('writeOrdinalLowerThan1000(): should handle female gender', (t) => {
    t.is(writeOrdinalLowerThan1000(1, Genders.FEMALE), 'primeira')
    t.is(writeOrdinalLowerThan1000(42, Genders.FEMALE), 'quadragésima segunda')
    t.is(
        writeOrdinalLowerThan1000(999, Genders.FEMALE),
        'nongentésima nonagésima nona',
    )
})

test('writeOrdinal(): should handle zero and values greater than 1000', (t) => {
    t.is(writeOrdinal('0'), 'zerésimo')
    t.is(writeOrdinal('1000'), 'milésimo')
    t.is(writeOrdinal('1001'), 'milésimo primeiro')
    t.is(writeOrdinal('2000'), 'segundo milésimo')
    t.is(writeOrdinal('21000'), 'vigésimo primeiro milésimo')
    t.is(writeOrdinal('1000000'), 'milionésimo')
    t.is(writeOrdinal('2000001'), 'segundo milionésimo primeiro')
})

test('writeOrdinal(): should handle gender and scale', (t) => {
    t.is(writeOrdinal('0', Scales.SHORT, Genders.FEMALE), 'zerésima')
    t.is(writeOrdinal('1001', Scales.SHORT, Genders.FEMALE), 'milésima primeira')
    t.is(writeOrdinal('1000000000'), 'bilionésimo')
    t.is(writeOrdinal('1000000000', Scales.LONG), 'milésimo milionésimo')
    t.is(
        writeOrdinal('1000000000', Scales.LONG, Genders.FEMALE),
        'milésima milionésima',
    )
})

test('writeOrdinal(): should enforce scale limits', (t) => {
    t.throws(
        () => writeOrdinal('1000000000000000000000000000000000000000000'),
        { message: 'Number exceeds short scale limit' },
    )
})
