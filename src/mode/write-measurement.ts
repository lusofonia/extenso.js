import Scales from '../ts/enum/scales.enum'
import writeInteger from '../core/write-integer'
import writeNumber from './write-number'
import type { ExtensoScale, MeasurementUnit } from '../types'

const ONE_MILLION = 1000000n

/** Writes a cardinal quantity followed by a custom measurement unit. */
const writeMeasurement = (
    integer: string,
    decimal: string,
    unit: MeasurementUnit | undefined,
    scale: ExtensoScale = Scales.SHORT,
): string => {
    if (unit === undefined) {
        throw new TypeError('Measurement mode requires unit options')
    }

    const value = BigInt(integer)
    const hasDecimalValue = /[1-9]/.test(decimal)

    if (hasDecimalValue) {
        return `${writeNumber(integer, decimal, scale, unit.gender)} ${unit.plural}`
    }

    const text = writeInteger(integer, scale, unit.gender)
    if (value === 1n) {
        return `${text} ${unit.singular}`
    }
    if (value >= ONE_MILLION && value % ONE_MILLION === 0n) {
        return `${text} de ${unit.plural}`
    }
    return `${text} ${unit.plural}`
}

export default writeMeasurement
