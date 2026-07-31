import test from 'ava'
import extenso from '../index'
import Currencies from '../ts/enum/currencies.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import Genders from '../ts/enum/genders.enum'
import Locales from '../ts/enum/locales.enum'
import Modes from '../ts/enum/modes.enum'
import Scales from '../ts/enum/scales.enum'

test('every built-in currency supports codes, symbols, units, and subunits', (t) => {
    const currencies: [Currencies, string, string, string][] = [
        [Currencies.AOA, 'Kz', 'um kwanza e um cêntimo', 'dois kwanzas e dois cêntimos'],
        [Currencies.CVE, 'Esc', 'um escudo e um centavo', 'dois escudos e dois centavos'],
        [Currencies.BRL, 'R$', 'um real e um centavo', 'dois reais e dois centavos'],
        [Currencies.XOF, 'CFA', 'um franco e um centavo', 'dois francos e dois centavos'],
        [Currencies.MZN, 'MT', 'um metical e um centavo', 'dois meticais e dois centavos'],
        [Currencies.EUR, '€', 'um euro e um cêntimo', 'dois euros e dois cêntimos'],
        [Currencies.STN, 'Db', 'uma dobra e um cêntimo', 'duas dobras e dois cêntimos'],
        [Currencies.USD, '$', 'um dólar e um centavo', 'dois dólares e dois centavos'],
        [Currencies.MOP, 'MOP$', 'uma pataca e um avo', 'duas patacas e dois avos'],
    ]

    for (const [code, symbol, singular, plural] of currencies) {
        t.is(extenso(`1.01 ${code}`), singular)
        t.is(extenso(`${symbol} 2.02`), plural)
        t.is(extenso('1.01', { currency: { code } }), singular)
    }
})

test('equivalent formats and option combinations preserve behavior', (t) => {
    const customCurrency = {
        singular: 'crédito',
        plural: 'créditos',
        gender: Genders.MALE,
        subunit: {
            singular: 'ficha',
            plural: 'fichas',
            gender: Genders.FEMALE,
        },
    }

    t.is(
        extenso('1,234.56'),
        extenso('1.234,56', { decimalSeparator: DecimalSeparators.COMMA }),
    )
    t.is(
        extenso('R$ 1,234.56'),
        extenso('R$ 1.234,56', { decimalSeparator: DecimalSeparators.COMMA }),
    )
    t.is(
        extenso('1000000000000', { scale: Scales.LONG, locale: Locales.PT }),
        'um bilião',
    )
    t.is(
        extenso('2.02', { currency: customCurrency, removeAccents: true }),
        'dois creditos e duas fichas',
    )
    t.is(extenso('BRL 1.01', { currency: customCurrency }), 'um crédito e uma ficha')
    t.is(
        extenso('1234.56', { mode: Modes.NUMBER, currency: customCurrency }),
        'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos',
    )
    t.is(extenso('BRL 1500', { mode: Modes.ABBREVIATED }), '1,5 mil')
    t.is(extenso('1', { currency: {} }), 'um real')
})

test('zero decimals and negative zero are normalized consistently', (t) => {
    t.is(extenso('0.0'), 'zero')
    t.is(extenso('0.00'), 'zero')
    t.is(extenso('-0'), 'zero')
    t.is(extenso('-0.00'), 'zero')
    t.is(extenso(-0), 'zero')
    t.is(extenso('1.00'), 'um')
    t.is(extenso('1.00', { number: { ordinal: true } }), 'primeiro')
    t.is(extenso('-0.00', { mode: Modes.DIGIT }), 'zero vírgula zero zero')
    t.is(extenso('-1', { number: { ordinal: true } }), 'menos primeiro')
})

test('scale boundaries are consistent across public modes', (t) => {
    const shortMaximum = `1${'0'.repeat(39)}`
    const shortOverflow = `1${'0'.repeat(42)}`
    const longMaximum = `1${'0'.repeat(72)}`
    const longOverflow = `1${'0'.repeat(75)}`

    t.is(extenso(shortMaximum), 'um duodecilhão')
    t.is(extenso(shortMaximum, { number: { ordinal: true } }), 'duodecilionésimo')
    t.is(extenso(shortMaximum, { mode: Modes.CURRENCY }), 'um duodecilhão de reais')
    t.is(extenso(shortMaximum, { mode: Modes.ABBREVIATED }), '1 duodec')

    t.is(extenso(longMaximum, { scale: Scales.LONG }), 'um duodecilhão')
    t.is(
        extenso(longMaximum, { scale: Scales.LONG, number: { ordinal: true } }),
        'duodecilionésimo',
    )
    t.is(
        extenso(longMaximum, { mode: Modes.CURRENCY, scale: Scales.LONG }),
        'um duodecilhão de reais',
    )
    t.is(
        extenso(longMaximum, { mode: Modes.ABBREVIATED, scale: Scales.LONG }),
        '1 duodec',
    )

    for (const options of [
        {},
        { number: { ordinal: true } },
        { mode: Modes.CURRENCY },
        { mode: Modes.ABBREVIATED },
    ]) {
        t.throws(() => extenso(shortOverflow, options), {
            message: 'Number exceeds short scale limit',
        })
    }
    for (const options of [
        { scale: Scales.LONG },
        { scale: Scales.LONG, number: { ordinal: true } },
        { mode: Modes.CURRENCY, scale: Scales.LONG },
        { mode: Modes.ABBREVIATED, scale: Scales.LONG },
    ]) {
        t.throws(() => extenso(longOverflow, options), {
            message: 'Number exceeds long scale limit',
        })
    }
})

test('fractional scale names and limits follow the selected scale', (t) => {
    t.is(extenso('0.000000001'), 'um bilionésimo')
    t.is(
        extenso('0.000000001', { scale: Scales.LONG }),
        'um milésimo milionésimo',
    )
    t.is(
        extenso('1.000000000001', { scale: Scales.LONG }),
        'um inteiro e um bilionésimo',
    )
    t.is(
        extenso(`0.${'0'.repeat(71)}1`, { scale: Scales.LONG }),
        'um duodecilionésimo',
    )
    t.is(
        extenso(`0.${'0'.repeat(73)}1`, { scale: Scales.LONG }),
        'um centésimo de duodecilionésimo',
    )
    t.throws(() => extenso(`0.${'0'.repeat(74)}1`, { scale: Scales.LONG }), {
        message: 'Number exceeds limit',
    })
})

test('equivalent input types and scientific notation work across modes', (t) => {
    const expected = 'cento e vinte e três'
    t.is(extenso('123'), expected)
    t.is(extenso(123), expected)
    t.is(extenso(123n), expected)

    t.is(extenso(1.5e3, { mode: Modes.ABBREVIATED }), '1,5 mil')
    t.is(extenso(1e3, { mode: Modes.CURRENCY }), 'mil reais')
    t.is(extenso(1e3, { mode: Modes.DIGIT }), 'um zero zero zero')
    t.is(extenso(1e3, { number: { ordinal: true } }), 'milésimo')
})
