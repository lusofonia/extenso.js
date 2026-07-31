import test from 'ava'
import { getCurrency, getScaleLimit, listCurrencies } from '../metadata'
import extenso from '../index'
import Currencies from '../ts/enum/currencies.enum'
import Scales from '../ts/enum/scales.enum'

test('currency metadata exposes every built-in definition safely', (t) => {
    const currencies = listCurrencies()

    t.is(currencies.length, Object.values(Currencies).length)
    t.deepEqual(getCurrency(Currencies.BRL), {
        code: Currencies.BRL,
        fractionDigits: 2,
        gender: 'male',
        plural: 'reais',
        singular: 'real',
        subunit: {
            gender: 'male',
            plural: 'centavos',
            singular: 'centavo',
        },
        symbols: ['R$'],
    })

    currencies[0].singular = 'alterado'
    t.not(listCurrencies()[0].singular, 'alterado')

    // @ts-expect-error Deliberately exercising runtime validation
    t.throws(() => getCurrency('ZZZ'), { message: 'Invalid currency code: ZZZ' })
})

test('scale metadata exposes exact short and long boundaries', (t) => {
    t.deepEqual(getScaleLimit(), {
        largestNamedExponent: 39,
        maximum: '9'.repeat(42),
        maximumDigits: 42,
        scale: Scales.SHORT,
    })
    t.deepEqual(getScaleLimit(Scales.LONG), {
        largestNamedExponent: 72,
        maximum: '9'.repeat(75),
        maximumDigits: 75,
        scale: Scales.LONG,
    })

    // @ts-expect-error Deliberately exercising runtime validation
    t.throws(() => getScaleLimit('unknown'), { message: 'Invalid scale: unknown' })
})

test('metadata functions are attached to the public callable export', (t) => {
    t.is(extenso.getCurrency(Currencies.EUR).singular, 'euro')
    t.is(extenso.getScaleLimit(Scales.LONG).maximumDigits, 75)
    t.is(extenso.listCurrencies().length, 9)
})
