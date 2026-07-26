import Scales from '../../ts/enum/scales.enum'
import split from '../../utils/split'
import listFrom1000, { ONE_THOUSAND } from '../../lists/list-from-1000'
import writeLowerThan1000 from './write-lower-than-1000'
import Genders from '../../ts/enum/genders.enum'

/**
 * Writes a number greater than 1000 in words
 * @param input - The number to write
 * @param scale - The scale to use (SHORT or LONG)
 * @returns The number written in words
 * @throws {Error} If the number exceeds the scale limit
 */
const writeGreaterThan1000 = (
    input: string,
    scale: Scales = Scales.SHORT,
    gender: Genders = Genders.MALE,
): string => {
    const groups = split(input).reverse()

    return groups
        .map((part: number, index: number): string => {
            const groupGender = index <= 1 ? gender : Genders.MALE
            const text = writeLowerThan1000(part, groupGender)
            let name = listFrom1000[scale][index - 1]

            if (part === 0) {
                return ''
            }
            if (index === 0) {
                if (part < 100 || part % 100 === 0) {
                    return `e ${text}`
                }
                return text
            }
            if (name === undefined) {
                throw new Error(`Number exceeds ${scale} scale limit`)
            }
            if (part === 1) {
                if (name === ONE_THOUSAND) {
                    name = ''
                }
            } else {
                name = name.replace('ão', 'ões')
            }
            const groupText = `${name === '' ? '' : `${text} `}${name || ONE_THOUSAND}`
            const hasHigherGroup = groups.slice(index + 1).some((group) => group > 0)
            const hasOnlyZeroLowerGroups = groups.slice(0, index).every((group) => group === 0)

            if (hasHigherGroup && hasOnlyZeroLowerGroups && (part < 100 || part % 100 === 0)) {
                return `e ${groupText}`
            }
            return groupText
        })
        .reverse()
        .filter((part: string): boolean => {
            return !!part
        })
        .map((part: string, index: number, parts: string[]): string => {
            if (index < parts.length - 2) {
                return `${part},`
            }
            return part
        })
        .join(' ')
}

export default writeGreaterThan1000
