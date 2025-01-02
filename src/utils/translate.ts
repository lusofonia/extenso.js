import Locales from "../ts/locales.enum"

const translate = (text: string, locale: Locales = Locales.BR): string => {
    switch (locale) {
    case Locales.PT:
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