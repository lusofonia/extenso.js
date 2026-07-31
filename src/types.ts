import Currencies from './ts/enum/currencies.enum'
import DecimalSeparators from './ts/enum/decimal-separators.enum'
import Genders from './ts/enum/genders.enum'
import Locales from './ts/enum/locales.enum'
import Modes from './ts/enum/modes.enum'
import Scales from './ts/enum/scales.enum'

export type ExtensoMode = `${Modes}`
export type ExtensoLocale = `${Locales}`
export type ExtensoScale = `${Scales}`
export type ExtensoGender = `${Genders}`
export type DecimalSeparator = `${DecimalSeparators}`
export type CurrencyCode = `${Currencies}`

export interface BuiltInCurrencyOptions {
    code?: CurrencyCode
    singular?: never
    plural?: never
    gender?: never
    subunit?: never
}

export interface CurrencyDefinition {
    singular: string
    plural: string
    gender: ExtensoGender
    subunit: {
        singular: string
        plural: string
        gender: ExtensoGender
    }
}

export type CurrencyOptions =
    | BuiltInCurrencyOptions
    | (CurrencyDefinition & { code?: never })

export interface NumberOptions {
    gender?: ExtensoGender
    ordinal?: boolean
}

export interface ExtensoOptions {
    mode?: ExtensoMode
    locale?: ExtensoLocale
    scale?: ExtensoScale
    decimalSeparator?: DecimalSeparator
    removeAccents?: boolean
    currency?: CurrencyOptions
    number?: NumberOptions
}
