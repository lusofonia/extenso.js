/**
 * Splits a string into groups of 3 digits from right to left
 * @param input - The string to split
 */
const split = (input: string): number[] => {
    const result = []

    for (let i = input.length; i > 0; i -= 3) {
        const start = Math.max(0, i - 3)
        result.unshift(input.slice(start, i))
    }

    return result.map(Number)
}

export default split