import Currencies from '../enum/currencies.enum'
import DecimalSeparators from '../enum/decimal-separators.enum'
import Genders from '../enum/genders.enum'
import Locales from '../enum/locales.enum'
import Modes from '../enum/modes.enum'
import Scales from '../enum/scales.enum'
import Currency from './currency.interface'

interface BuiltInCurrencyOptions {
    code?: Currencies
    singular?: never
    plural?: never
    gender?: never
    subunit?: never
}

type CustomCurrencyOptions = Currency & {
    code?: never
}

export type CurrencyOptions = BuiltInCurrencyOptions | CustomCurrencyOptions

interface Options {
    mode?: Modes
    locale?: Locales
    scale?: Scales
    decimalSeparator?: DecimalSeparators
    currency?: CurrencyOptions
    removeAccents?: boolean
    currency?: {
        code?: Currencies
    }
    number?: {
        gender?: Genders
    }
}

export default Options
