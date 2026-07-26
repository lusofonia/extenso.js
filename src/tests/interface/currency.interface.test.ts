import test from 'ava'
import Currency from '../../ts/interface/currency.interface'
import Genders from '../../ts/enum/genders.enum'

test('Currency interface structure', t => {
    const currency: Currency = {
        singular: 'Dollar',
        plural: 'Dollars',
        gender: Genders.MALE,
        subunit: {
            singular: 'Cent',
            plural: 'Cents',
            gender: Genders.MALE,
        },
    }

    t.is(currency.singular, 'Dollar')
    t.is(currency.plural, 'Dollars')
    t.is(currency.subunit.singular, 'Cent')
    t.is(currency.subunit.plural, 'Cents')
})
