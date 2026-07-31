import Currencies from './ts/enum/currencies.enum'
import CurrencyRoundings from './ts/enum/currency-roundings.enum'
import DecimalSeparators from './ts/enum/decimal-separators.enum'
import Genders from './ts/enum/genders.enum'
import Locales from './ts/enum/locales.enum'
import Modes from './ts/enum/modes.enum'
import Scales from './ts/enum/scales.enum'
import TextCases from './ts/enum/text-cases.enum'

export type ExtensoMode = `${Modes}`
export type ExtensoLocale = `${Locales}`
export type ExtensoScale = `${Scales}`
export type ExtensoGender = `${Genders}`
export type DecimalSeparator = `${DecimalSeparators}`
export type CurrencyCode = `${Currencies}`
export type CurrencyRounding = `${CurrencyRoundings}`
export type TextCase = `${TextCases}`

export interface CurrencyFormattingOptions {
    rounding?: CurrencyRounding
    showZeroSubunit?: boolean
    showZeroUnit?: boolean
}

export interface BuiltInCurrencyOptions {
    code?: CurrencyCode
    fractionDigits?: never
    singular?: never
    plural?: never
    gender?: never
    subunit?: never
}

export interface CurrencyDefinition {
    fractionDigits?: number
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
    CurrencyFormattingOptions & (
        | BuiltInCurrencyOptions
        | (CurrencyDefinition & { code?: never })
    )

export interface NumberOptions {
    gender?: ExtensoGender
    ordinal?: boolean
}

export interface MeasurementUnit {
    singular: string
    plural: string
    gender: ExtensoGender
}

export interface ExtensoOptions {
    mode?: ExtensoMode
    locale?: ExtensoLocale
    scale?: ExtensoScale
    textCase?: TextCase
    decimalSeparator?: DecimalSeparator
    removeAccents?: boolean
    currency?: CurrencyOptions
    number?: NumberOptions
    unit?: MeasurementUnit
}
