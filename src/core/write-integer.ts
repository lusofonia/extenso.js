import Scales from '../ts/enum/scales.enum'
import writeAtLeast1000 from './integer/write-greater-than-1000'
import writeLowerThan1000 from './integer/write-lower-than-1000'
import Genders from '../ts/enum/genders.enum'
import type { ExtensoGender, ExtensoScale } from '../types'

/**
 * Writes an integer number in words
 * @param input - The integer to write
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The integer written in words
 */
const writeInteger = (
    input: string,
    scale: ExtensoScale = Scales.SHORT,
    gender: ExtensoGender = Genders.MALE,
): string => {
    const significantInput = input.replace(/^0+(?=\d)/, '')

    if (significantInput.length < 4) {
        return writeLowerThan1000(Number(significantInput), gender)
    }
    return writeAtLeast1000(significantInput, scale, gender)
}

export default writeInteger
