import Genders from '../ts/enum/genders.enum'
import Scales from '../ts/enum/scales.enum'
import writeNumber from './write-number'
import type { ExtensoGender, ExtensoScale } from '../types'

/** Writes a cardinal number followed by the invariant expression "por cento". */
const writePercentage = (
    integer: string,
    decimal = '0',
    scale: ExtensoScale = Scales.SHORT,
    gender: ExtensoGender = Genders.MALE,
): string => {
    return `${writeNumber(integer, decimal, scale, gender)} por cento`
}

export default writePercentage
