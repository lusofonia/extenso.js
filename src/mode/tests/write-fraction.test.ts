import test from 'ava'
import writeFraction from '../write-fraction'
import Scales from '../../ts/enum/scales.enum'

test('writeFraction(): should write common fractions', (t) => {
    t.is(writeFraction('1', '1'), 'um inteiro')
    t.is(writeFraction('1', '2'), 'um meio')
    t.is(writeFraction('3', '4'), 'três quartos')
    t.is(writeFraction('2', '10'), 'dois décimos')
})

test('writeFraction(): should write powers of ten and other denominators', (t) => {
    t.is(writeFraction('1', '100'), 'um centésimo')
    t.is(writeFraction('2', '1000'), 'dois milésimos')
    t.is(writeFraction('1', '11'), 'um onze avos')
    t.is(writeFraction('3', '20'), 'três vinte avos')
    t.is(
        writeFraction('1', '1000000000', Scales.LONG),
        'um milésimo milionésimo',
    )
})
