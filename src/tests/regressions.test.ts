import test from 'ava'
import extenso from '../index'
import Currencies from '../ts/enum/currencies.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import Genders from '../ts/enum/genders.enum'
import Locales from '../ts/enum/locales.enum'
import Modes from '../ts/enum/modes.enum'
import Scales from '../ts/enum/scales.enum'

test('currency mode preserves and validates decimal precision', (t) => {
    const currency = { mode: Modes.CURRENCY }

    t.is(extenso('1', currency), 'um real')
    t.is(extenso('1.1', currency), 'um real e dez centavos')
    t.is(extenso('1.01', currency), 'um real e um centavo')
    t.is(extenso('0.01', currency), 'um centavo')
    t.is(extenso('0.10', currency), 'dez centavos')
    t.is(extenso('0.00', currency), 'zero reais')

    for (const input of ['1.001', '1.009', '1.999']) {
        t.throws(() => extenso(input, currency), {
            instanceOf: RangeError,
            message: 'Currency values must have zero, one, or two decimal places',
        })
    }

    t.is(extenso('EUR 1.1'), 'um euro e dez cêntimos')
    t.is(extenso('MOP$0.01'), 'um avo')
    t.is(extenso('USD 0.10'), 'dez centavos')
})

test('female gender reaches units, tens, hundreds, and thousands only', (t) => {
    const female = { number: { gender: Genders.FEMALE } }
    const expected: [string, string][] = [
        ['1', 'uma'],
        ['2', 'duas'],
        ['21', 'vinte e uma'],
        ['22', 'vinte e duas'],
        ['200', 'duzentas'],
        ['201', 'duzentas e uma'],
        ['300', 'trezentas'],
        ['322', 'trezentas e vinte e duas'],
        ['900', 'novecentas'],
        ['300000', 'trezentas mil'],
        ['322000', 'trezentas e vinte e duas mil'],
        ['200322', 'duzentas mil trezentas e vinte e duas'],
        ['200000000', 'duzentos milhões'],
        ['200000322', 'duzentos milhões trezentas e vinte e duas'],
        ['2000000000', 'dois bilhões'],
    ]

    for (const [input, output] of expected) {
        t.is(extenso(input, female), output)
    }
})

test('parser accepts valid grouping and rejects malformed input', (t) => {
    t.is(extenso('1,234,567.89'), 'um milhão, duzentos e trinta e quatro mil quinhentos e sessenta e sete inteiros e oitenta e nove centésimos')
    t.is(extenso('1.234.567,89', {
        decimalSeparator: DecimalSeparators.COMMA,
    }), 'um milhão, duzentos e trinta e quatro mil quinhentos e sessenta e sete inteiros e oitenta e nove centésimos')

    for (const input of ['1,23,456', '12,34', '1.23.456', '-', '1.']) {
        t.throws(() => extenso(input))
    }
    t.throws(() => extenso('1,', { decimalSeparator: DecimalSeparators.COMMA }))
})

test('finite JavaScript scientific notation is normalized exactly', (t) => {
    t.is(extenso(1e3), 'mil')
    t.is(extenso(1e21), 'um sextilhão')
    t.is(extenso(1.25e3), 'mil duzentos e cinquenta')
    t.is(extenso(1e-3), 'um milésimo')
    t.is(extenso(1e-7), 'um décimo de milionésimo')
    t.is(extenso(-1.25e-7), 'menos cento e vinte e cinco bilionésimos')

    t.throws(() => extenso(Number.NaN), {
        instanceOf: RangeError,
        message: 'Input number must be finite',
    })
    t.throws(() => extenso(Number.POSITIVE_INFINITY), {
        message: 'Input number must be finite',
    })
    t.throws(() => extenso(Number.NEGATIVE_INFINITY), {
        message: 'Input number must be finite',
    })
    t.throws(() => extenso('NaN'), { message: 'Input number must be finite' })
    t.throws(() => extenso('Infinity'), { message: 'Input number must be finite' })
    t.throws(() => extenso('-Infinity'), { message: 'Input number must be finite' })
})

test('all public options are validated at runtime', (t) => {
    const invalidOptions: unknown[] = [
        { mode: 'unknown' },
        { locale: 'unknown' },
        { scale: 'unknown' },
        { decimalSeparator: 'unknown' },
        { removeAccents: 'yes' },
        { number: { gender: 'unknown' } },
        { currency: { code: 'ZZZ' } },
        { currency: { singular: 'crédito' } },
        { currency: { plural: 'créditos' } },
        { currency: { gender: Genders.MALE } },
        { currency: { subunit: {} } },
        {
            currency: {
                code: Currencies.BRL,
                singular: 'crédito',
                plural: 'créditos',
                gender: Genders.MALE,
                subunit: {
                    singular: 'ficha',
                    plural: 'fichas',
                    gender: Genders.FEMALE,
                },
            },
        },
        {
            currency: {
                singular: '',
                plural: 'créditos',
                gender: Genders.MALE,
                subunit: {
                    singular: 'ficha',
                    plural: 'fichas',
                    gender: Genders.FEMALE,
                },
            },
        },
        {
            currency: {
                singular: 'crédito',
                plural: 'créditos',
                gender: 'unknown',
                subunit: {
                    singular: 'ficha',
                    plural: 'fichas',
                    gender: Genders.FEMALE,
                },
            },
        },
        ...[null, 'ficha', []].map(subunit => ({
            currency: {
                singular: 'crédito',
                plural: 'créditos',
                gender: Genders.MALE,
                subunit,
            },
        })),
        {
            currency: {
                singular: 'crédito',
                plural: '',
                gender: Genders.MALE,
                subunit: {
                    singular: 'ficha',
                    plural: 'fichas',
                    gender: Genders.FEMALE,
                },
            },
        },
        {
            currency: {
                singular: 'crédito',
                plural: 'créditos',
                gender: Genders.MALE,
                subunit: {
                    singular: '',
                    plural: 'fichas',
                    gender: Genders.FEMALE,
                },
            },
        },
        {
            currency: {
                singular: 'crédito',
                plural: 'créditos',
                gender: Genders.MALE,
                subunit: {
                    singular: 'ficha',
                    plural: '',
                    gender: Genders.FEMALE,
                },
            },
        },
        {
            currency: {
                singular: 'crédito',
                plural: 'créditos',
                gender: Genders.MALE,
                subunit: {
                    singular: 'ficha',
                    plural: 'fichas',
                    gender: 'unknown',
                },
            },
        },
        { currency: [] },
        { currency: 'BRL' },
        { number: null },
        { currency: null },
        null,
    ]

    for (const options of invalidOptions) {
        // @ts-expect-error Deliberately exercising runtime validation
        t.throws(() => extenso('1', options), { instanceOf: TypeError })
    }

    t.is(extenso('1', {
        mode: Modes.NUMBER,
        locale: Locales.BR,
        scale: Scales.SHORT,
        decimalSeparator: DecimalSeparators.POINT,
        removeAccents: false,
        number: { gender: Genders.MALE },
        currency: { code: Currencies.BRL },
    }), 'um')
})

test('accent removal works across every output mode and locale', (t) => {
    t.is(extenso('3'), 'três')
    t.is(extenso('3', { removeAccents: false }), 'três')
    t.is(extenso('3', { removeAccents: true }), 'tres')
    t.is(
        extenso('-2000003.14', { removeAccents: true }),
        'menos dois milhoes e tres inteiros e quatorze centesimos',
    )
    t.is(
        extenso('€ 2000003.14', { removeAccents: true }),
        'dois milhoes e tres euros e quatorze centimos',
    )
    t.is(
        extenso('3.2', { mode: Modes.DIGIT, removeAccents: true }),
        'tres virgula dois',
    )
    t.is(
        extenso('1000000000', { locale: Locales.PT, removeAccents: true }),
        'um biliao',
    )
})

test('currency markers are complete, unambiguous, and overridable', (t) => {
    t.is(extenso('R$ 1.01'), 'um real e um centavo')
    t.is(extenso('$ 1.01'), 'um dólar e um centavo')
    t.is(extenso('€ 1.01'), 'um euro e um cêntimo')
    t.is(extenso('MOP$ 1.01'), 'uma pataca e um avo')
    t.is(extenso('1.01 BRL BRL'), 'um real e um centavo')
    t.is(extenso('R$ 1.01', {
        currency: { code: Currencies.EUR },
    }), 'um euro e um cêntimo')

    t.throws(() => extenso('R$ 1.01 USD'), {
        message: 'Conflicting currency markers: BRL, USD',
    })
    t.throws(() => extenso('1$2'), {
        message: 'Invalid number format: whitespace is not allowed within the number',
    })
    t.throws(() => extenso('prefixBRLsuffix 1'))
})

test('large, negative, bigint, leading-zero, and precise string inputs', (t) => {
    t.is(extenso(-123), 'menos cento e vinte e três')
    t.is(extenso(-123n), 'menos cento e vinte e três')
    t.is(extenso(12345678901234567890n), 'doze quintilhões, trezentos e quarenta e cinco quatrilhões, seiscentos e setenta e oito trilhões, novecentos e um bilhões, duzentos e trinta e quatro milhões, quinhentos e sessenta e sete mil oitocentos e noventa')
    t.is(extenso('000123'), 'cento e vinte e três')
    t.is(extenso('0.000000000000000001'), 'um quintilionésimo')
    t.throws(() => extenso(`1${'0'.repeat(42)}`), {
        message: 'Number exceeds short scale limit',
    })
    t.throws(() => extenso('1'.repeat(1001)), {
        message: 'Input exceeds maximum length of 1000 characters',
    })
})
