import Scales from '../ts/enum/scales.enum'

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

const longOrdinalScales = shortOrdinalScales.flatMap((name, index) => {
    if (index === 0) {
        return [name]
    }
    return [name, `milésimo ${name}`]
})

const listOrdinalScales: Record<Scales, string[]> = {
    [Scales.SHORT]: shortOrdinalScales,
    [Scales.LONG]: longOrdinalScales,
}

export default listOrdinalScales
