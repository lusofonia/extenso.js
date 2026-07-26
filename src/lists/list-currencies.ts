import Currencies from '../ts/enum/currencies.enum'
import Currency from '../ts/interface/currency.interface'
import Genders from '../ts/enum/genders.enum'

const currencies: Record<Currencies, Currency> = {
    [Currencies.AOA]: {
        singular: 'kwanza',
        plural: 'kwanzas',
        gender: Genders.MALE,
        subunit: {
            singular: 'cêntimo',
            plural: 'cêntimos',
            gender: Genders.MALE,
        },
    },
    [Currencies.CVE]: {
        singular: 'escudo',
        plural: 'escudos',
        gender: Genders.MALE,
        subunit: {
            singular: 'centavo',
            plural: 'centavos',
            gender: Genders.MALE,
        },
    },
    [Currencies.BRL]: {
        singular: 'real',
        plural: 'reais',
        gender: Genders.MALE,
        subunit: {
            singular: 'centavo',
            plural: 'centavos',
            gender: Genders.MALE,
        },
    },
    [Currencies.XOF]: {
        singular: 'franco',
        plural: 'francos',
        gender: Genders.MALE,
        subunit: {
            singular: 'centavo',
            plural: 'centavos',
            gender: Genders.MALE,
        },
    },
    [Currencies.MZN]: {
        singular: 'metical',
        plural: 'meticais',
        gender: Genders.MALE,
        subunit: {
            singular: 'centavo',
            plural: 'centavos',
            gender: Genders.MALE,
        },
    },
    [Currencies.EUR]: {
        singular: 'euro',
        plural: 'euros',
        gender: Genders.MALE,
        subunit: {
            singular: 'cêntimo',
            plural: 'cêntimos',
            gender: Genders.MALE,
        },
    },
    [Currencies.STN]: {
        singular: 'dobra',
        plural: 'dobras',
        gender: Genders.FEMALE,
        subunit: {
            singular: 'centavo',
            plural: 'centavos',
            gender: Genders.MALE,
        },
    },
    [Currencies.USD]: {
        singular: 'dólar',
        plural: 'dólares',
        gender: Genders.MALE,
        subunit: {
            singular: 'centavo',
            plural: 'centavos',
            gender: Genders.MALE,
        },
    },
    [Currencies.MOP]: {
        singular: 'pataca',
        plural: 'patacas',
        gender: Genders.FEMALE,
        subunit: {
            singular: 'avo',
            plural: 'avos',
            gender: Genders.MALE,
        },
    },
}

export default currencies
