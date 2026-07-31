import Genders from '../ts/enum/genders.enum'
import Scales from '../ts/enum/scales.enum'
import pluralize from '../utils/pluralize'
import writeInteger from '../core/write-integer'
import writeDecimal from '../core/write-decimal'
import writeOrdinal from '../core/write-ordinal'

/**
 * Writes a number in words with optional decimal part and gender
 * @param integer - The integer part of the number
 * @param decimal - The decimal part of the number
 * @param scale - The scale to use (SHORT or LONG)
 * @param gender - The gender to use for the number (MALE or FEMALE)
 * @param ordinal - Whether to write the number as an ordinal
 * @returns The complete number written in words
 */
const writeNumber = (
    integer: string,
    decimal = '0',
    scale: Scales = Scales.SHORT,
    gender: Genders = Genders.MALE,
    ordinal = false,
): string => {
    if (ordinal) {
        if (decimal !== '0') {
            throw new RangeError('Ordinal numbers must be integers')
        }
        return writeOrdinal(integer, scale, gender)
    }

    if (integer === '0' && decimal === '0') {
        return 'zero'
    }
    if (integer === '0') {
        return writeDecimal(decimal)
    }

    let text: string
    if (decimal === '0') {
        text = writeInteger(integer, scale, gender)
    } else {
        const whole = gender === Genders.FEMALE ? 'inteira' : 'inteiro'
        text = `${writeInteger(integer, scale, gender)} ${pluralize(whole, Number(integer))} e ${writeDecimal(decimal)}`
    }

    return text
}

export default writeNumber
