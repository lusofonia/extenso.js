import test from 'ava'
import Options from '../../ts/interface/options.interface'
import Currencies from '../../ts/enum/currencies.enum'
import DecimalSeparators from '../../ts/enum/decimal-separators.enum'
import Genders from '../../ts/enum/genders.enum'
import Locales from '../../ts/enum/locales.enum'
import Modes from '../../ts/enum/modes.enum'
import Scales from '../../ts/enum/scales.enum'

test('Options interface structure', t => {
    const options: Options = {
        mode: Modes.CURRENCY,
        locale: Locales.BR,
        scale: Scales.LONG,
        decimalSeparator: DecimalSeparators.POINT,
        currency: {
            code: Currencies.USD,
        },
        number: {
            gender: Genders.MALE,
        },
    }

    t.is(options.mode, Modes.CURRENCY)
    t.is(options.locale, Locales.BR)
    t.is(options.scale, Scales.LONG)
    t.is(options.decimalSeparator, DecimalSeparators.POINT)
    t.is(options.currency?.code, Currencies.USD)
    t.is(options.number?.gender, Genders.MALE)
})