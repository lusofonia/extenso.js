import test from 'ava'
import extenso from '../index'
import Currencies from '../ts/enum/currencies.enum'
import CurrencyRoundings from '../ts/enum/currency-roundings.enum'
import Genders from '../ts/enum/genders.enum'
import Modes from '../ts/enum/modes.enum'

test('currency mode preserves and validates decimal precision', (t) => {
    const currency = { mode: Modes.CURRENCY }

    t.is(extenso('1', currency), 'um real')
    t.is(extenso('1.1', currency), 'um real e dez centavos')
    t.is(extenso('1.01', currency), 'um real e um centavo')
    t.is(extenso('0.01', currency), 'um centavo')
    t.is(extenso('0.10', currency), 'dez centavos')
    t.is(extenso('0.00', currency), 'zero reais')

    for (const input of ['1.001', '1.009', '1.999']) {
        t.throws(() => extenso(input, currency), {
            instanceOf: RangeError,
            message: 'Currency values must have zero, one, or two decimal places',
        })
    }

    t.is(extenso('EUR 1.1'), 'um euro e dez cêntimos')
    t.is(extenso('MOP$0.01'), 'um avo')
    t.is(extenso('USD 0.10'), 'dez centavos')
})

test('currency formatting controls preserve exact decimal semantics', (t) => {
    t.is(extenso('1.239', {
        currency: { code: Currencies.BRL, rounding: CurrencyRoundings.TRUNCATE },
    }), 'um real e vinte e três centavos')
    t.is(extenso('1.235', {
        currency: { code: Currencies.BRL, rounding: CurrencyRoundings.HALF_UP },
    }), 'um real e vinte e quatro centavos')
    t.is(extenso('1.999', {
        currency: { code: Currencies.BRL, rounding: CurrencyRoundings.HALF_UP },
    }), 'dois reais')
    t.is(extenso('-1.999', {
        currency: { code: Currencies.BRL, rounding: CurrencyRoundings.HALF_UP },
    }), 'menos dois reais')
    t.is(extenso('0.50', {
        currency: { code: Currencies.BRL, showZeroUnit: true },
    }), 'zero reais e cinquenta centavos')
    t.is(extenso('1', {
        currency: { code: Currencies.BRL, showZeroSubunit: true },
    }), 'um real e zero centavos')
    t.is(extenso('0', {
        currency: {
            code: Currencies.BRL,
            showZeroSubunit: true,
            showZeroUnit: true,
        },
    }), 'zero reais e zero centavos')
})

test('custom currencies support configurable decimal places', (t) => {
    const currency = {
        fractionDigits: 3,
        singular: 'crédito',
        plural: 'créditos',
        gender: Genders.MALE,
        subunit: {
            singular: 'ficha',
            plural: 'fichas',
            gender: Genders.FEMALE,
        },
    }

    t.is(extenso('1.234', { currency }), 'um crédito e duzentas e trinta e quatro fichas')
    t.is(extenso('1.2349', {
        currency: { ...currency, rounding: CurrencyRoundings.TRUNCATE },
    }), 'um crédito e duzentas e trinta e quatro fichas')
    t.is(extenso('1.2345', {
        currency: { ...currency, rounding: CurrencyRoundings.HALF_UP },
    }), 'um crédito e duzentas e trinta e cinco fichas')
    t.throws(() => extenso('1.2345', { currency }), {
        message: 'Currency values must have at most 3 decimal places',
    })

    const wholeCurrency = { ...currency, fractionDigits: 0 }
    t.is(extenso('1.4', {
        currency: { ...wholeCurrency, rounding: CurrencyRoundings.HALF_UP },
    }), 'um crédito')
    t.is(extenso('1.5', {
        currency: { ...wholeCurrency, rounding: CurrencyRoundings.HALF_UP },
    }), 'dois créditos')
    t.is(extenso('1.9', {
        currency: { ...wholeCurrency, rounding: CurrencyRoundings.TRUNCATE },
    }), 'um crédito')
})
