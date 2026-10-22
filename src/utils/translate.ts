import Locales from '../ts/enum/locales.enum'
import Scales from '../ts/enum/scales.enum'
import listFrom1000 from '../lists/list-from-1000'
import type { ExtensoLocale } from '../types'

// Only named scales change spelling; similar suffixes in custom units do not.
const translatedScales = listFrom1000[Scales.SHORT].slice(2)
    .map(name => name.replace('ão', '(?:ão|ões)'))
    .join('|')
const scalePattern = new RegExp(
    `(?<![\\p{L}\\p{M}])(?:${translatedScales})(?![\\p{L}\\p{M}])`,
    'gu',
)

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
            .replace(scalePattern, (name: string): string => {
                return name.replace('h', 'i')
            })
    case Locales.BR:
    default:
        return text
    }
}

export default translate
