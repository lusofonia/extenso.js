import test from 'ava'
import Options from '../options.interface'
import Currencies from '../../enum/currencies.enum'
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
        },
        number: {
            gender: Genders.MALE,
            ordinal: true,
        },
    }

    t.is(options.mode, Modes.CURRENCY)
    t.is(options.locale, Locales.BR)
    t.is(options.scale, Scales.LONG)
    t.is(options.decimalSeparator, DecimalSeparators.POINT)
    t.true(options.removeAccents)
    t.is(options.currency?.code, Currencies.USD)
    t.is(options.number?.gender, Genders.MALE)
    t.true(options.number?.ordinal)
})

test('Options interface accepts a custom currency', t => {
    const options: Options = {
        currency: {
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
    t.is(options.currency?.subunit?.plural, 'fichas')
})
