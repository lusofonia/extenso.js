/**
 * Pluralizes a word based on count
 * @param text - The word to pluralize
 * @param count - The count to determine if pluralization is needed
 */
const pluralize = (text: string, count: number) => {
    if (count === 1) {
        return text
    }
    return `${text}s`
}

export default pluralize