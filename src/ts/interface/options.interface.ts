import Currencies from '../enum/currencies.enum'
import DecimalSeparators from '../enum/decimal-separators.enum'
import Genders from '../enum/genders.enum'
import Locales from '../enum/locales.enum'
import Modes from '../enum/modes.enum'
import Scales from '../enum/scales.enum'

interface Options {
    mode?: Modes
    locale?: Locales
    scale?: Scales
    decimalSeparator?: DecimalSeparators
    removeAccents?: boolean
    currency?: {
        code?: Currencies
    }
    number?: {
        gender?: Genders
    }
}

export default Options
