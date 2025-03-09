import Scales from '../ts/enum/scales.enum'
import writeGreaterThan1000 from './integer/write-greater-than-1000'
import writeLowerThan1000 from './integer/write-lower-than-1000'

/**
 * Writes an integer number in words
 * @param input - The integer to write
 * @param scale - The scale to use (SHORT or LONG)
 */
const writeInteger = (input: string, scale: Scales = Scales.SHORT): string => {
    if (Number(input) < 1000) {
        return writeLowerThan1000(Number(input))
    }
    return writeGreaterThan1000(input, scale)
}

export default writeInteger
