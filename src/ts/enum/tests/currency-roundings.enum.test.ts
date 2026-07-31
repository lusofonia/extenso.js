import test from 'ava'
import CurrencyRoundings from '../currency-roundings.enum'

test('CurrencyRoundings enum values', (t) => {
    t.deepEqual(Object.values(CurrencyRoundings), ['half-up', 'reject', 'truncate'])
})
