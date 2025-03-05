import listFrom0To9 from '../../lists/list-from-0-to-9'
import listFrom10To19 from '../../lists/list-from-10-to-19'
import listFrom20To90 from '../../lists/list-from-20-to-90'
import listFrom100To900, { HUNDRED } from '../../lists/list-from-100-to-900'

/**
 * Writes a number from 0 to 9 in words
 * @param input - The number to write
 * @returns The number written in words
 */
export const writeLowerThan10 = (input: number): string => {
    return listFrom0To9[input]
}

/**
 * Writes a number from 0 to 19 in words
 * @param input - The number to write
 * @returns The number written in words
 */
export const writeLowerThan20 = (input: number): string => {
    if (input < 10) {
        return writeLowerThan10(input)
    }
    return listFrom10To19[input - 10]
}

/**
 * Writes a number from 0 to 99 in words
 * @param input - The number to write
 * @returns The number written in words
 */
export const writeLowerThan100 = (input: number): string => {
    if (input < 20) {
        return writeLowerThan20(input)
    }
    const name = listFrom20To90[(input - input % 10) / 10 - 2]
    if (input % 10 === 0) {
        return name
    }
    return `${name} e ${writeLowerThan10(input % 10)}`
}

/**
 * Writes a number from 0 to 999 in words
 * @param input - The number to write
 * @returns The number written in words
 */
const writeLowerThan1000 = (input: number): string => {
    if (input < 100) {
        return writeLowerThan100(input)
    }
    const name = listFrom100To900[(input - input % 100) / 100 - 1]
    if (input % 100 === 0) {
        if (input === 100) {
            return HUNDRED
        }
        return name
    }
    return `${name} e ${writeLowerThan100(input % 100)}`
}

export default writeLowerThan1000