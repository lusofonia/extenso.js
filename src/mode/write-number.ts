import Genders from '../ts/enum/genders.enum'
import Scales from '../ts/enum/scales.enum'
import pluralize from '../utils/pluralize'
import writeInteger from '../core/write-integer'
import writeDecimal from '../core/write-decimal'

/**
 * Writes a number in words with optional decimal part and gender
 * @param integer - The integer part of the number
 * @param decimal - The decimal part of the number
 * @param scale - The scale to use (SHORT or LONG)
 * @param gender - The gender to use for the number (MALE or FEMALE)
 * @returns The complete number written in words
 */
const writeNumber = (
    integer: string,
    decimal = '0',
    scale: Scales = Scales.SHORT,
    gender: Genders = Genders.MALE,
): string => {
    if (integer === '0' && decimal === '0') {
        return 'zero'
    }
    if (integer === '0') {
        return writeDecimal(decimal)
    }

    let text
    if (decimal === '0') {
        text = writeInteger(integer, scale)
    } else {
        text = `${writeInteger(integer, scale)} ${pluralize('inteiro', Number(integer))} e ${writeDecimal(decimal)}`
    }

    switch (gender) {
    case Genders.FEMALE:
        text = text
            .replace(/\bum\b/g, 'uma')
            .replace(/\bdois\b/g, 'duas')
        break
    case Genders.MALE:
    default:
        break
    }

    return text
}

export default writeNumber