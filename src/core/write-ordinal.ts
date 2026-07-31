import listOrdinalScales, {
    ordinalHundreds,
    ordinalTens,
    ordinalUnits,
} from '../lists/list-ordinals'
import Genders from '../ts/enum/genders.enum'
import Scales from '../ts/enum/scales.enum'
import split from '../utils/split'
import type { ExtensoGender, ExtensoScale } from '../types'

const inflectGender = (text: string, gender: ExtensoGender): string => {
    if (gender === Genders.MALE) {
        return text
    }
    return text.replace(/o\b/g, 'a')
}

/**
 * Writes an integer lower than 1000 as an ordinal.
 */
export const writeOrdinalLowerThan1000 = (
    input: number,
    gender: ExtensoGender = Genders.MALE,
): string => {
    const parts = [
        ordinalHundreds[Math.floor(input / 100) - 1],
        ordinalTens[Math.floor(input % 100 / 10) - 1],
        ordinalUnits[input % 10],
    ].filter((part): part is string => Boolean(part))

    return inflectGender(parts.join(' '), gender)
}

/**
 * Writes a non-negative integer as an ordinal.
 */
const writeOrdinal = (
    input: string,
    scale: ExtensoScale = Scales.SHORT,
    gender: ExtensoGender = Genders.MALE,
): string => {
    if (BigInt(input) === 0n) {
        return gender === Genders.FEMALE ? 'zerésima' : 'zerésimo'
    }

    const groups = split(input)
    const ordinalScales = listOrdinalScales[scale]

    return groups
        .map((group, index) => {
            if (group === 0) {
                return ''
            }

            const scaleIndex = groups.length - index - 2
            if (scaleIndex < 0) {
                return writeOrdinalLowerThan1000(group, gender)
            }

            const scaleName = ordinalScales[scaleIndex]
            if (scaleName === undefined) {
                throw new Error(`Number exceeds ${scale} scale limit`)
            }

            const qualifier = group === 1
                ? ''
                : `${writeOrdinalLowerThan1000(group, gender)} `
            return inflectGender(`${qualifier}${scaleName}`, gender)
        })
        .filter(Boolean)
        .join(' ')
}

export default writeOrdinal
