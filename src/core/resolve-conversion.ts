import Currencies from '../ts/enum/currencies.enum'
import Modes from '../ts/enum/modes.enum'
import detectCurrency from '../utils/detect-currency'
import type {
    CurrencyCode,
    CurrencyDefinition,
    CurrencyOptions,
    ExtensoMode,
    ExtensoOptions,
} from '../types'

interface ConversionSettings {
    currency: CurrencyCode | CurrencyDefinition
    mode: ExtensoMode
}

const isCustomCurrency = (
    currency: CurrencyOptions | undefined,
): currency is CurrencyDefinition & { code?: never } => {
    return currency !== undefined && currency.singular !== undefined
}

/** Resolves implicit mode and currency choices before the input is normalized. */
const resolveConversion = (input: unknown, options: ExtensoOptions): ConversionSettings => {
    const detectedCurrency = typeof input === 'string' ? detectCurrency(input) : undefined
    const customCurrency = isCustomCurrency(options.currency) ? options.currency : undefined
    const currencyCode = options.currency?.code ?? detectedCurrency ?? Currencies.BRL

    return {
        currency: customCurrency ?? currencyCode,
        mode: options.mode ?? (detectedCurrency || options.currency !== undefined
            ? Modes.CURRENCY
            : Modes.NUMBER),
    }
}

export default resolveConversion
