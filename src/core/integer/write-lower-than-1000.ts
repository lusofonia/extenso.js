import listFrom0To9, { listFrom0To9Female } from '../../lists/list-from-0-to-9'
import listFrom10To19 from '../../lists/list-from-10-to-19'
import listFrom20To90 from '../../lists/list-from-20-to-90'
import listFrom100To900, {
    HUNDRED,
    listFrom100To900Female,
} from '../../lists/list-from-100-to-900'
import Genders from '../../ts/enum/genders.enum'

/**
 * Writes a number from 0 to 9 in words
 * @param input - The number to write
 * @returns The number written in words
 */
export const writeLowerThan10 = (input: number, gender: Genders = Genders.MALE): string => {
    return gender === Genders.FEMALE ? listFrom0To9Female[input] : listFrom0To9[input]
}

/**
 * Writes a number from 0 to 19 in words
 * @param input - The number to write
 * @returns The number written in words
 */
export const writeLowerThan20 = (input: number, gender: Genders = Genders.MALE): string => {
    if (input < 10) {
        return writeLowerThan10(input, gender)
    }
    return listFrom10To19[input - 10]
}

/**
 * Writes a number from 0 to 99 in words
 * @param input - The number to write
 * @returns The number written in words
 */
export const writeLowerThan100 = (input: number, gender: Genders = Genders.MALE): string => {
    if (input < 20) {
        return writeLowerThan20(input, gender)
    }
    const name = listFrom20To90[(input - input % 10) / 10 - 2]
    if (input % 10 === 0) {
        return name
    }
    return `${name} e ${writeLowerThan10(input % 10, gender)}`
}

/**
 * Writes a number from 0 to 999 in words
 * @param input - The number to write
 * @returns The number written in words
 */
const writeLowerThan1000 = (input: number, gender: Genders = Genders.MALE): string => {
    if (input < 100) {
        return writeLowerThan100(input, gender)
    }
    const hundreds = gender === Genders.FEMALE ? listFrom100To900Female : listFrom100To900
    const name = hundreds[(input - input % 100) / 100 - 1]
    if (input % 100 === 0) {
        if (input === 100) {
            return HUNDRED
        }
        return name
    }
    return `${name} e ${writeLowerThan100(input % 100, gender)}`
}

export default writeLowerThan1000
