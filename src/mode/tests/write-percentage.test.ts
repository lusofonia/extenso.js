import test from 'ava'
import writePercentage from '../write-percentage'
import Genders from '../../ts/enum/genders.enum'
import Scales from '../../ts/enum/scales.enum'

test('writePercentage(): should handle integer and decimal percentages', (t) => {
    t.is(writePercentage('0'), 'zero por cento')
    t.is(writePercentage('12', '5'), 'doze inteiros e cinco décimos por cento')
    t.is(writePercentage('100'), 'cem por cento')
})

test('writePercentage(): should respect number options', (t) => {
    t.is(
        writePercentage('2', '0', Scales.SHORT, Genders.FEMALE),
        'duas por cento',
    )
    t.is(
        writePercentage('2000000000', '0', Scales.LONG),
        'dois mil milhões por cento',
    )
})
