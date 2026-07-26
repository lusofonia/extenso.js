import Scales from '../ts/enum/scales.enum'
import writeGreaterThan1000 from './integer/write-greater-than-1000'
import writeLowerThan1000 from './integer/write-lower-than-1000'
import Genders from '../ts/enum/genders.enum'

/**
 * Writes an integer number in words
 * @param input - The integer to write
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The integer written in words
 */
const writeInteger = (
    input: string,
    scale: Scales = Scales.SHORT,
    gender: Genders = Genders.MALE,
): string => {
    if (Number(input) < 1000) {
        return writeLowerThan1000(Number(input), gender)
    }
    return writeGreaterThan1000(input, scale, gender)
}

export default writeInteger
