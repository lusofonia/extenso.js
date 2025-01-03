import Scales from '../ts/scales.enum'

export const ONE_THOUSAND = 'mil'

const listFrom1000: Record<Scales, string[]> = {
    [Scales.SHORT]: [
        'mil',
        'milhão',
        'bilhão',
        'trilhão',
        'quatrilhão',
        'quintilhão',
        'sextilhão',
        'septilhão',
        'octilhão',
        'nonilhão',
        'decilhão',
        'undecilhão',
        'duodecilhão',
    ],
    [Scales.LONG]: [
        'mil',
        'milhão',
        'mil milhão',
        'bilhão',
        'mil bilhão',
        'trilhão',
        'mil trilhão',
        'quatrilhão',
        'mil quatrilhão',
        'quintilhão',
        'mil quintilhão',
        'sextilhão',
        'mil sextilhão',
        'septilhão',
        'mil septilhão',
        'octilhão',
        'mil octilhão',
        'nonilhão',
        'mil nonilhão',
        'decilhão',
        'mil decilhão',
        'undecilhão',
        'mil undecilhão',
        'duodecilhão',
    ],
}

export default listFrom1000