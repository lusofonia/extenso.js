/**
 * Removes diacritical marks from text while preserving its other characters.
 * @param text - The text to normalize
 * @returns The text without accents
 */
const removeAccents = (text: string): string =>
    text.normalize('NFD').replace(/\p{Diacritic}/gu, '')

export default removeAccents
