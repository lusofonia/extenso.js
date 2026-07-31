import Scales from '../ts/enum/scales.enum'
import type { ExtensoScale } from '../types'

export const ONE_THOUSAND = 'mil'

const listFrom1000: Record<ExtensoScale, string[]> = {
    [Scales.SHORT]: [
        'mil',           // 10^3
        'milhão',        // 10^6
        'bilhão',        // 10^9
        'trilhão',       // 10^12
        'quatrilhão',    // 10^15
        'quintilhão',    // 10^18
        'sextilhão',     // 10^21
        'septilhão',     // 10^24
        'octilhão',      // 10^27
        'nonilhão',      // 10^30
        'decilhão',      // 10^33
        'undecilhão',    // 10^36
        'duodecilhão',   // 10^39
    ],
    [Scales.LONG]: [
        'mil',            // 10^3
        'milhão',         // 10^6
        'mil milhão',     // 10^9
        'bilhão',         // 10^12
        'mil bilhão',     // 10^15
        'trilhão',        // 10^18
        'mil trilhão',    // 10^21
        'quatrilhão',     // 10^24
        'mil quatrilhão', // 10^27
        'quintilhão',     // 10^30
        'mil quintilhão', // 10^33
        'sextilhão',      // 10^36
        'mil sextilhão',  // 10^39
        'septilhão',      // 10^42
        'mil septilhão',  // 10^45
        'octilhão',       // 10^48
        'mil octilhão',   // 10^51
        'nonilhão',       // 10^54
        'mil nonilhão',   // 10^57
        'decilhão',       // 10^60
        'mil decilhão',   // 10^63
        'undecilhão',     // 10^66
        'mil undecilhão', // 10^69
        'duodecilhão',    // 10^72
    ],
}

export default listFrom1000
