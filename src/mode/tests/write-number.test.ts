import test from 'ava'
import writeNumber from '../write-number'
import Scales from '../../ts/enum/scales.enum'
import Genders from '../../ts/enum/genders.enum'

test('writeNumber(): should handle integer values with male gender', (t) => {
    t.is(writeNumber('0'), 'zero')
    t.is(writeNumber('1'), 'um')
    t.is(writeNumber('2'), 'dois')
    t.is(writeNumber('10'), 'dez')
    t.is(writeNumber('15'), 'quinze')
    t.is(writeNumber('30'), 'trinta')
    t.is(writeNumber('35'), 'trinta e cinco')
    t.is(writeNumber('100'), 'cem')
    t.is(writeNumber('101'), 'cento e um')
    t.is(writeNumber('110'), 'cento e dez')
    t.is(writeNumber('135'), 'cento e trinta e cinco')
})

test('writeNumber(): should handle integer values with female gender', (t) => {
    t.is(writeNumber('1', '0', Scales.SHORT, Genders.FEMALE), 'uma')
    t.is(writeNumber('2', '0', Scales.SHORT, Genders.FEMALE), 'duas')
    t.is(writeNumber('22', '0', Scales.SHORT, Genders.FEMALE), 'vinte e duas')
    t.is(writeNumber('42002', '0', Scales.SHORT, Genders.FEMALE), 'quarenta e duas mil e duas')
})

test('writeNumber(): should handle decimal values', (t) => {
    t.is(writeNumber('0', '1'), 'um décimo')
    t.is(writeNumber('0', '01'), 'um centésimo')
    t.is(writeNumber('0', '001'), 'um milésimo')
    t.is(writeNumber('0', '0005'), 'cinco décimos de milésimo')
    t.is(writeNumber('0', '00005'), 'cinco centésimos de milésimo')
    t.is(writeNumber('0', '000005'), 'cinco milionésimos')
})

test('writeNumber(): should handle integer and decimal values', (t) => {
    t.is(writeNumber('0', '0'), 'zero')
    t.is(writeNumber('1', '1'), 'um inteiro e um décimo')
    t.is(writeNumber('2', '1'), 'dois inteiros e um décimo')
    t.is(writeNumber('10', '01'), 'dez inteiros e um centésimo')
    t.is(writeNumber('15', '001'), 'quinze inteiros e um milésimo')
    t.is(writeNumber('30', '0005'), 'trinta inteiros e cinco décimos de milésimo')
    t.is(writeNumber('35', '00005'), 'trinta e cinco inteiros e cinco centésimos de milésimo')
    t.is(writeNumber('100', '000005'), 'cem inteiros e cinco milionésimos')
})