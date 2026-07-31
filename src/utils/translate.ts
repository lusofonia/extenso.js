import Locales from '../ts/enum/locales.enum'
import type { ExtensoLocale } from '../types'

const translate = (text: string, locale: ExtensoLocale = Locales.BR): string => {
    switch (locale) {
    case Locales.AO:
    case Locales.CV:
    case Locales.GW:
    case Locales.MO:
    case Locales.MZ:
    case Locales.PT:
    case Locales.ST:
        text = text
            .replace(/\bquatorze\b/g, 'catorze')
            .replace(/\bdezesseis\b/g, 'dezasseis')
            .replace(/\bdezessete\b/g, 'dezassete')
            .replace(/\bdezenove\b/g, 'dezanove')

        return text
            .replace(/[^m]ilh(ão|ões)/g, (suffix: string): string => {
                return suffix.replace(/h/g, 'i')
            })
    case Locales.BR:
    default:
        return text
    }
}

export default translate
