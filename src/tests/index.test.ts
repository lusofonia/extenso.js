import test from 'ava'
import extenso from '../index'
import Modes from '../ts/enum/modes.enum'
import Currencies from '../ts/enum/currencies.enum'

test('extenso(): should handle default mode (NUMBER)', (t) => {
    t.is(extenso('1234.56'), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
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
    t.is(extenso('1234.56 EUR 789', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56 789 USD', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should handle currency symbols in different positions', (t) => {
    t.is(extenso('R$ 1234.56', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('1234.56 € 789', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso('1234.56 789 $', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should handle multiple currency indicators', (t) => {
    // Should use the first occurrence
    t.is(extenso('BRL 1234.56 EUR', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso('R$ 1234.56 €', { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
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