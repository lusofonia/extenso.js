import test from 'ava'
import extenso from '../index'
import Modes from '../ts/enum/modes.enum'
import Currencies from '../ts/enum/currencies.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'

test('extenso(): should handle default mode (NUMBER)', (t) => {
    t.is(extenso('1234.56'), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should handle ABBREVIATED mode', (t) => {
    t.is(extenso('1500', { mode: Modes.ABBREVIATED }), '1,5 mil')
    t.is(extenso(1500000, { mode: Modes.ABBREVIATED }), '1,5 mi')
    t.is(extenso(1500000000n, { mode: Modes.ABBREVIATED }), '1,5 bi')
    t.is(extenso('-1550', { mode: Modes.ABBREVIATED }), 'menos 1,6 mil')
})

test('extenso(): should handle negative numbers', (t) => {
    t.is(extenso('-1234.56'), 'menos mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
    t.is(extenso(-1234.56), 'menos mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should handle undefined number gender', (t) => {
    t.is(extenso('1234.56', { mode: Modes.NUMBER, number: {} }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should detect currency from code in input', (t) => {
    t.is(extenso('1234.56 BRL', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56 EUR', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56 USD', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should detect currency from symbol in input', (t) => {
    t.is(extenso('R$ 1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('€ 1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('$ 1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should detect currency from code in input without spaces', (t) => {
    t.is(extenso('1234.56BRL', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56EUR', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56USD', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should detect currency from symbol in input without spaces', (t) => {
    t.is(extenso('R$1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('€1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('$1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should handle currency codes in different positions', (t) => {
    t.is(extenso('BRL 1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56 EUR', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.throws(() => extenso('1234.56 789 USD', { mode: Modes.CURRENCY }), {
        message: 'Invalid number format: whitespace is not allowed within the number',
    })
})

test('extenso(): should handle currency symbols in different positions', (t) => {
    t.is(extenso('R$ 1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56 €', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.throws(() => extenso('1234.56 789 $', { mode: Modes.CURRENCY }), {
        message: 'Invalid number format: whitespace is not allowed within the number',
    })
})

test('extenso(): should reject conflicting currency indicators', (t) => {
    t.throws(() => extenso('BRL 1234.56 EUR', { mode: Modes.CURRENCY }), {
        message: 'Conflicting currency markers: BRL, EUR',
    })
    t.throws(() => extenso('R$ 1234.56 €', { mode: Modes.CURRENCY }), {
        message: 'Conflicting currency markers: BRL, EUR',
    })
})

test('extenso(): should handle negative currency values', (t) => {
    t.is(extenso('-1234.56 BRL', { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('-1234.56 EUR', { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('-1234.56 USD', { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
    t.is(extenso('-R$ 1234.56', { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('-€ 1234.56', { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('-$ 1234.56', { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should prioritize currency code from options over detection', (t) => {
    t.is(extenso('R$ 1234.56', { mode: Modes.CURRENCY, currency: { code: Currencies.EUR } }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56 BRL', { mode: Modes.CURRENCY, currency: { code: Currencies.USD } }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should automatically set mode to CURRENCY when currency is detected', (t) => {
    // Test with currency code
    t.is(extenso('1234.56 BRL'), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56 EUR'), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56 USD'), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')

    // Test with currency symbol
    t.is(extenso('R$ 1234.56'), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('€ 1234.56'), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('$ 1234.56'), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')

    // Test with currency code without spaces
    t.is(extenso('1234.56BRL'), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56EUR'), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56USD'), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')

    // Test with currency symbol without spaces
    t.is(extenso('R$1234.56'), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('€1234.56'), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('$1234.56'), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')

    // Test that NUMBER mode is still used when no currency is detected
    t.is(extenso('1234.56'), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should prioritize explicit mode over auto-detection', (t) => {
    // Even with currency detected, explicit mode should be used
    t.is(extenso('R$ 1234.56', { mode: Modes.NUMBER }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
    t.is(extenso('1234.56 BRL', { mode: Modes.DIGIT }), 'um dois três quatro vírgula cinco seis')
})

test('extenso(): should handle decimal separator in DIGIT mode', (t) => {
    // Test with point separator
    t.is(extenso('1234.56', { mode: Modes.DIGIT }), 'um dois três quatro vírgula cinco seis')

    // Test with comma separator
    t.is(extenso('1234,56', { mode: Modes.DIGIT, decimalSeparator: DecimalSeparators.COMMA }), 'um dois três quatro vírgula cinco seis')
})

test('extenso(): should parse number inputs with the JavaScript decimal separator', (t) => {
    t.is(
        extenso(3.14, { decimalSeparator: DecimalSeparators.COMMA }),
        'três inteiros e quatorze centésimos',
    )
    t.is(
        extenso(3.14, { mode: Modes.CURRENCY, decimalSeparator: DecimalSeparators.COMMA }),
        'três reais e quatorze centavos',
    )
    t.is(
        extenso(3.14, { mode: Modes.DIGIT, decimalSeparator: DecimalSeparators.COMMA }),
        'três vírgula um quatro',
    )
})

test('extenso(): should preserve supplied zeros in DIGIT mode', (t) => {
    t.is(extenso('0012', { mode: Modes.DIGIT }), 'zero zero um dois')
    t.is(extenso('0012.0', { mode: Modes.DIGIT }), 'zero zero um dois vírgula zero')
    t.is(extenso('000.05', { mode: Modes.DIGIT }), 'zero zero zero vírgula zero cinco')
    t.is(
        extenso('0012,00', { mode: Modes.DIGIT, decimalSeparator: DecimalSeparators.COMMA }),
        'zero zero um dois vírgula zero zero',
    )
})

test('extenso(): should handle mode detection edge cases', (t) => {
    // Test with explicit mode and no currency
    t.is(extenso('1234.56', { mode: Modes.NUMBER }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')

    // Test with explicit mode and detected currency
    t.is(extenso('R$ 1234.56', { mode: Modes.NUMBER }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')

    // Test with explicit mode and currency code
    t.is(extenso('1234.56', { mode: Modes.NUMBER, currency: { code: Currencies.BRL } }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should handle all mode detection combinations', (t) => {
    // Test with no mode and no currency
    t.is(extenso('1234.56'), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')

    // Test with no mode and detected currency
    t.is(extenso('R$ 1234.56'), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')

    // Test with no mode and currency code
    t.is(extenso('1234.56', { currency: { code: Currencies.BRL } }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')

    // Test with no mode and both detected currency and currency code
    t.is(extenso('R$ 1234.56', { currency: { code: Currencies.EUR } }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
})

test('extenso(): should handle all decimal separator combinations in DIGIT mode', (t) => {
    // Test with point separator and no decimal
    t.is(extenso('1234', { mode: Modes.DIGIT }), 'um dois três quatro')

    // Test with comma separator and no decimal
    t.is(extenso('1234', { mode: Modes.DIGIT, decimalSeparator: DecimalSeparators.COMMA }), 'um dois três quatro')

    // Test with point separator and decimal
    t.is(extenso('1234.56', { mode: Modes.DIGIT }), 'um dois três quatro vírgula cinco seis')

    // Test with comma separator and decimal
    t.is(extenso('1234,56', { mode: Modes.DIGIT, decimalSeparator: DecimalSeparators.COMMA }), 'um dois três quatro vírgula cinco seis')
})

test('extenso(): should handle invalid mode', (t) => {
    // @ts-expect-error - Testing invalid mode
    t.throws(() => extenso('1234.56', { mode: 'INVALID' }), {
        instanceOf: TypeError,
        message: 'Invalid mode: INVALID',
    })
})
