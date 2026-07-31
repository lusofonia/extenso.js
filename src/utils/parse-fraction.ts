const normalizePart = (part: string): string => {
    return part.replace(/^0+(?=\d)/, '')
}

/** Parses an exact integer fraction written as numerator/denominator. */
const parseFraction = (input: string): { numerator: string, denominator: string } => {
    const match = /^-?(\d+)\/(\d+)$/.exec(input)

    if (!match) {
        throw new Error('Invalid fraction format: expected numerator/denominator')
    }

    const numerator = normalizePart(match[1])
    const denominator = normalizePart(match[2])

    if (denominator === '0') {
        throw new RangeError('Fraction denominator cannot be zero')
    }

    return { numerator, denominator }
}

export default parseFraction
