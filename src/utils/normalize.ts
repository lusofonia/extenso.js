const MAX_INPUT_LENGTH = 1000 // Maximum length for input strings to prevent memory issues

const normalize = (input: string | number | bigint) => {
    if (typeof input === 'bigint') {
        input = input.toString()
    }
    if (typeof input !== 'string' && typeof input !== 'number') {
        throw new TypeError('Input must be a string, number or bigint')
    }

    const normalized = input.toString().trim().replace(/\s/g, '')
    
    if (normalized.length > MAX_INPUT_LENGTH) {
        throw new Error(`Input exceeds maximum length of ${MAX_INPUT_LENGTH} characters`)
    }

    return normalized
}

export default normalize