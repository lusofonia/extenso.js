import TextCases from '../ts/enum/text-cases.enum'
import type { TextCase } from '../types'

const TITLE_LOWERCASE_WORDS = new Set(['a', 'as', 'de', 'do', 'dos', 'e', 'o', 'os', 'por'])

const capitalize = (word: string): string => {
    return `${word.charAt(0).toLocaleUpperCase('pt')}${word.slice(1).toLocaleLowerCase('pt')}`
}

const toTitleCase = (text: string): string => {
    return text.split(' ').map((word, index) => {
        if (index > 0 && TITLE_LOWERCASE_WORDS.has(word.toLocaleLowerCase('pt'))) {
            return word.toLocaleLowerCase('pt')
        }
        return capitalize(word)
    }).join(' ')
}

/** Applies an explicit casing policy to generated text. */
const formatTextCase = (text: string, textCase: TextCase): string => {
    const formatters: Record<TextCase, (value: string) => string> = {
        [TextCases.LOWER]: value => value.toLocaleLowerCase('pt'),
        [TextCases.TITLE]: toTitleCase,
        [TextCases.UPPER]: value => value.toLocaleUpperCase('pt'),
    }

    return formatters[textCase](text)
}

export default formatTextCase
