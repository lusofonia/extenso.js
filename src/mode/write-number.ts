import Genders from '../ts/enum/genders.enum'
import Scales from '../ts/enum/scales.enum'
import pluralize from '../utils/pluralize'
import writeInteger from '../core/write-integer'
import writeDecimal from '../core/write-decimal'
import writeOrdinal from '../core/write-ordinal'
import type { ExtensoGender, ExtensoScale } from '../types'

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
    scale: ExtensoScale = Scales.SHORT,
    gender: ExtensoGender = Genders.MALE,
    ordinal = false,
): string => {
    const hasDecimalValue = /[1-9]/.test(decimal)

    if (ordinal) {
        if (hasDecimalValue) {
            throw new RangeError('Ordinal numbers must be integers')
        }
        return writeOrdinal(integer, scale, gender)
    }

    if (integer === '0' && !hasDecimalValue) {
        return 'zero'
    }
    if (integer === '0') {
        return writeDecimal(decimal, scale)
    }

    let text: string
    if (!hasDecimalValue) {
        text = writeInteger(integer, scale, gender)
    } else {
        const whole = gender === Genders.FEMALE ? 'inteira' : 'inteiro'
        text = `${writeInteger(integer, scale, gender)} ${pluralize(whole, Number(integer))} e ${writeDecimal(decimal, scale)}`
    }

    return text
}

export default writeNumber
