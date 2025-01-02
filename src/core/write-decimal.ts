import pluralize from "../utils/pluralize"
import writeInteger from "./write-integer"
import listDecimals from "../lists/list-decimals"

const writeDecimal = (input: string): string => {
    const text = writeInteger(input)
    const count = Number(input)
    
    if (input.length === 1) {
        return `${text} ${pluralize('décimo', count)}`
    }
    if (input.length === 2) {
        return `${text} ${pluralize('centésimo', count)}`
    }

    const name = pluralize(listDecimals[Math.floor(input.length / 3) - 1], count)

    switch (input.length % 3) {
    case 1:
        return `${text} ${pluralize('décimo', count)} de ${name}`
    case 2:
        return `${text} ${pluralize('centésimo', count)} de ${name}`
    case 0:
    default:
        return `${text} ${name}`
    }
}

export default writeDecimal