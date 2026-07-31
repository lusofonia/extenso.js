import Scales from '../../ts/enum/scales.enum'
import split from '../../utils/split'
import listFrom1000, { ONE_THOUSAND } from '../../lists/list-from-1000'
import writeLowerThan1000 from './write-lower-than-1000'
import Genders from '../../ts/enum/genders.enum'
import type { ExtensoGender, ExtensoScale } from '../../types'

const needsConjunction = (part: number): boolean => {
    return part < 100 || part % 100 === 0
}

const inflectScale = (name: string, quantity: number): string => {
    if (quantity === 1) {
        return name === ONE_THOUSAND ? '' : name
    }
    return name.replace('ão', 'ões')
}

const formatGroup = (
    part: number,
    index: number,
    groups: number[],
    scale: ExtensoScale,
    gender: ExtensoGender,
): string => {
    if (part === 0) {
        return ''
    }

    const scaleName = listFrom1000[scale][index - 1]
    const acceptsRequestedGender = index === 0 || scaleName === ONE_THOUSAND
    const groupGender = acceptsRequestedGender ? gender : Genders.MALE
    const text = writeLowerThan1000(part, groupGender)

    if (index === 0) {
        return needsConjunction(part) ? `e ${text}` : text
    }
    if (scaleName === undefined) {
        throw new Error(`Number exceeds ${scale} scale limit`)
    }

    const inflectedScale = inflectScale(scaleName, part)
    const groupText = `${inflectedScale ? `${text} ` : ''}${inflectedScale || ONE_THOUSAND}`
    const hasHigherGroup = groups.slice(index + 1).some((group) => group > 0)
    const hasOnlyZeroLowerGroups = groups.slice(0, index).every((group) => group === 0)

    return hasHigherGroup && hasOnlyZeroLowerGroups && needsConjunction(part)
        ? `e ${groupText}`
        : groupText
}

const punctuate = (parts: string[]): string[] => {
    return parts.map((part, index) => index < parts.length - 2 ? `${part},` : part)
}

/**
 * Writes an integer of at least one thousand in words.
 * @throws {Error} If the number exceeds the selected scale limit.
 */
const writeAtLeast1000 = (
    input: string,
    scale: ExtensoScale = Scales.SHORT,
    gender: ExtensoGender = Genders.MALE,
): string => {
    const groups = split(input).reverse()
    const writtenGroups = groups
        .map((part, index) => formatGroup(part, index, groups, scale, gender))
        .reverse()
        .filter(Boolean)

    return punctuate(writtenGroups).join(' ')
}

export default writeAtLeast1000
