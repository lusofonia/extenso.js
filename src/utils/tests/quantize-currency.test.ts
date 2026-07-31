import test from 'ava'
import quantizeCurrency from '../quantize-currency'
import CurrencyRoundings from '../../ts/enum/currency-roundings.enum'

test('quantizeCurrency(): should preserve or pad accepted precision', (t) => {
    t.deepEqual(quantizeCurrency('1', '', 2), { unit: '1', subunit: '00' })
    t.deepEqual(quantizeCurrency('1', '2', 2), { unit: '1', subunit: '20' })
    t.deepEqual(quantizeCurrency('1', '234', 3), { unit: '1', subunit: '234' })
    t.deepEqual(quantizeCurrency('1', '', 0), { unit: '1', subunit: '0' })
})

test('quantizeCurrency(): should reject excess precision by default', (t) => {
    t.throws(() => quantizeCurrency('1', '001', 2), {
        message: 'Currency values must have zero, one, or two decimal places',
    })
    t.throws(() => quantizeCurrency('1', '1', 0), {
        message: 'Currency values must have at most 0 decimal places',
    })
})

test('quantizeCurrency(): should truncate or round half up exactly', (t) => {
    t.deepEqual(
        quantizeCurrency('1', '239', 2, CurrencyRoundings.TRUNCATE),
        { unit: '1', subunit: '23' },
    )
    t.deepEqual(
        quantizeCurrency('1', '234', 2, CurrencyRoundings.HALF_UP),
        { unit: '1', subunit: '23' },
    )
    t.deepEqual(
        quantizeCurrency('1', '235', 2, CurrencyRoundings.HALF_UP),
        { unit: '1', subunit: '24' },
    )
    t.deepEqual(
        quantizeCurrency('1', '999', 2, CurrencyRoundings.HALF_UP),
        { unit: '2', subunit: '00' },
    )
})
