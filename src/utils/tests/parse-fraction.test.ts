import test from 'ava'
import parseFraction from '../parse-fraction'

test('parseFraction(): should parse exact integer fractions', (t) => {
    t.deepEqual(parseFraction('3/4'), { numerator: '3', denominator: '4' })
    t.deepEqual(parseFraction('-003/004'), { numerator: '3', denominator: '4' })
})

test('parseFraction(): should reject malformed and zero-denominator fractions', (t) => {
    for (const input of ['3', '3/', '/4', '3/4/5', '3.5/4', 'three/four']) {
        t.throws(() => parseFraction(input), {
            message: 'Invalid fraction format: expected numerator/denominator',
        })
    }
    t.throws(() => parseFraction('3/000'), {
        instanceOf: RangeError,
        message: 'Fraction denominator cannot be zero',
    })
})
