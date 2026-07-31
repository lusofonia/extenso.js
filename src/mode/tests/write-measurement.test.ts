import test from 'ava'
import writeMeasurement from '../write-measurement'
import Genders from '../../ts/enum/genders.enum'

const kilograms = {
    singular: 'quilograma',
    plural: 'quilogramas',
    gender: Genders.MALE,
}

test('writeMeasurement(): should handle singular, plural, zero, and decimals', (t) => {
    t.is(writeMeasurement('0', '0', kilograms), 'zero quilogramas')
    t.is(writeMeasurement('1', '0', kilograms), 'um quilograma')
    t.is(writeMeasurement('2', '0', kilograms), 'dois quilogramas')
    t.is(
        writeMeasurement('2', '5', kilograms),
        'dois inteiros e cinco décimos quilogramas',
    )
    t.is(writeMeasurement('1000000', '0', kilograms), 'um milhão de quilogramas')
})

test('writeMeasurement(): should use the unit gender', (t) => {
    const tonnes = {
        singular: 'tonelada',
        plural: 'toneladas',
        gender: Genders.FEMALE,
    }

    t.is(writeMeasurement('1', '0', tonnes), 'uma tonelada')
    t.is(writeMeasurement('2', '0', tonnes), 'duas toneladas')
    t.is(
        writeMeasurement('2', '5', tonnes),
        'duas inteiras e cinco décimos toneladas',
    )
})

test('writeMeasurement(): should require a unit', (t) => {
    t.throws(() => writeMeasurement('1', '0', undefined), {
        instanceOf: TypeError,
        message: 'Measurement mode requires unit options',
    })
})
