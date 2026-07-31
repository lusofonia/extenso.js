import test from 'ava'
import Options from '../options.interface'
import Currencies from '../../enum/currencies.enum'
import CurrencyRoundings from '../../enum/currency-roundings.enum'
import DecimalSeparators from '../../enum/decimal-separators.enum'
import Genders from '../../enum/genders.enum'
import Locales from '../../enum/locales.enum'
import Modes from '../../enum/modes.enum'
import Scales from '../../enum/scales.enum'

test('Options interface structure', t => {
    const options: Options = {
        mode: Modes.CURRENCY,
        locale: Locales.BR,
        scale: Scales.LONG,
        decimalSeparator: DecimalSeparators.POINT,
        removeAccents: true,
        currency: {
            code: Currencies.USD,
            rounding: CurrencyRoundings.HALF_UP,
            showZeroSubunit: true,
            showZeroUnit: true,
        },
        number: {
            gender: Genders.MALE,
            ordinal: true,
        },
        unit: {
            singular: 'quilograma',
            plural: 'quilogramas',
            gender: Genders.MALE,
        },
    }

    t.is(options.mode, Modes.CURRENCY)
    t.is(options.locale, Locales.BR)
    t.is(options.scale, Scales.LONG)
    t.is(options.decimalSeparator, DecimalSeparators.POINT)
    t.true(options.removeAccents)
    t.is(options.currency?.code, Currencies.USD)
    t.is(options.currency?.rounding, CurrencyRoundings.HALF_UP)
    t.true(options.currency?.showZeroSubunit)
    t.true(options.currency?.showZeroUnit)
    t.is(options.number?.gender, Genders.MALE)
    t.true(options.number?.ordinal)
    t.is(options.unit?.singular, 'quilograma')
})

test('Options interface accepts a custom currency', t => {
    const options: Options = {
        currency: {
            fractionDigits: 3,
            singular: 'crédito',
            plural: 'créditos',
            gender: Genders.MALE,
            subunit: {
                singular: 'ficha',
                plural: 'fichas',
                gender: Genders.FEMALE,
            },
        },
    }

    t.is(options.currency?.singular, 'crédito')
    t.is(options.currency?.fractionDigits, 3)
    t.is(options.currency?.subunit?.plural, 'fichas')
})
