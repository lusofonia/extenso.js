import Scales from '../ts/enum/scales.enum'
import listFrom1000 from './list-from-1000'
import type { ExtensoScale } from '../types'

export const ordinalUnits = [
    '',
    'primeiro',
    'segundo',
    'terceiro',
    'quarto',
    'quinto',
    'sexto',
    'sétimo',
    'oitavo',
    'nono',
]

export const ordinalTens = [
    'décimo',
    'vigésimo',
    'trigésimo',
    'quadragésimo',
    'quinquagésimo',
    'sexagésimo',
    'septuagésimo',
    'octogésimo',
    'nonagésimo',
]

export const ordinalHundreds = [
    'centésimo',
    'ducentésimo',
    'trecentésimo',
    'quadringentésimo',
    'quingentésimo',
    'sexcentésimo',
    'septingentésimo',
    'octingentésimo',
    'nongentésimo',
]

const shortOrdinalScales = [
    'milésimo',
    'milionésimo',
    'bilionésimo',
    'trilionésimo',
    'quadrilionésimo',
    'quintilionésimo',
    'sextilionésimo',
    'septilionésimo',
    'octilionésimo',
    'nonilionésimo',
    'decilionésimo',
    'undecilionésimo',
    'duodecilionésimo',
]

const longOrdinalScales = shortOrdinalScales
    .flatMap((name, index) => {
        if (index === 0) {
            return [name]
        }
        return [name, `milésimo ${name}`]
    })
    .slice(0, listFrom1000[Scales.LONG].length)

const listOrdinalScales: Record<ExtensoScale, string[]> = {
    [Scales.SHORT]: shortOrdinalScales,
    [Scales.LONG]: longOrdinalScales,
}

export default listOrdinalScales
