import test from 'ava'
import extenso from '../index'
import Modes from '../ts/enum/modes.enum'
import Currencies from '../ts/enum/currencies.enum'
import DecimalSeparators from '../ts/enum/decimal-separators.enum'
import { currencyTestCases, getFormattedAmount, getFormattedAmountWithSymbol } from './utils/test-helpers'

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

test('extenso(): should detect currency from input', (t) => {
    const amount = '1234.56'
    const negativeAmount = '-1234.56'

    // Test basic currency detection for main currencies
    t.is(extenso(getFormattedAmount(amount, 'BRL'), { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso(getFormattedAmount(amount, 'EUR'), { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso(getFormattedAmount(amount, 'USD'), { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')

    // Test with currency symbols
    t.is(extenso(getFormattedAmountWithSymbol(amount, 'R$'), { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso(getFormattedAmountWithSymbol(amount, '€'), { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso(getFormattedAmountWithSymbol(amount, '$'), { mode: Modes.CURRENCY }), 'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')

    // Test negative amounts
    t.is(extenso(getFormattedAmount(negativeAmount, 'BRL'), { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro reais e cinquenta e seis centavos')
    t.is(extenso(getFormattedAmount(negativeAmount, 'EUR'), { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso(getFormattedAmount(negativeAmount, 'USD'), { mode: Modes.CURRENCY }), 'menos mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should automatically set mode to CURRENCY when currency is detected', (t) => {
    const amount = '1234.56'
    const currencyWords = {
        [Currencies.BRL]: 'reais',
        [Currencies.EUR]: 'euros',
        [Currencies.USD]: 'dólares',
        [Currencies.AOA]: 'kwanzas',
        [Currencies.CVE]: 'escudos',
        [Currencies.XOF]: 'francos',
        [Currencies.MZN]: 'meticais',
        [Currencies.STN]: 'dobras',
        [Currencies.MOP]: 'patacas',
    }

    for (const testCase of currencyTestCases) {
        const input = testCase.input.replace('123', amount)
        const result = extenso(input)
        const expectedWord = currencyWords[testCase.expectedCurrency]
        t.true(result.includes(expectedWord),
            `Currency mode not automatically set for: ${input}, expected to find: ${expectedWord}`)
    }

    // Test that NUMBER mode is still used when no currency is detected
    t.is(extenso(amount), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should prioritize currency code from options over detection', (t) => {
    const amount = '1234.56'
    t.is(extenso(getFormattedAmountWithSymbol(amount, 'R$'), { mode: Modes.CURRENCY, currency: { code: Currencies.EUR } }),
        'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
    t.is(extenso(getFormattedAmount(amount, 'BRL'), { mode: Modes.CURRENCY, currency: { code: Currencies.USD } }),
        'mil duzentos e trinta e quatro dólares e cinquenta e seis centavos')
})

test('extenso(): should prioritize explicit mode over auto-detection', (t) => {
    const amount = '1234.56'
    // Even with currency detected, explicit mode should be used
    t.is(extenso(getFormattedAmountWithSymbol(amount, 'R$'), { mode: Modes.NUMBER }),
        'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
    t.is(extenso(getFormattedAmount(amount, 'BRL'), { mode: Modes.DIGIT }),
        'um dois três quatro vírgula cinco seis')
})

test('extenso(): should handle decimal separator in DIGIT mode', (t) => {
    // Test with point separator
    t.is(extenso('1234.56', { mode: Modes.DIGIT }), 'um dois três quatro vírgula cinco seis')

    // Test with comma separator
    t.is(extenso('1234,56', { mode: Modes.DIGIT, decimalSeparator: DecimalSeparators.COMMA }), 'um dois três quatro vírgula cinco seis')
})

test('extenso(): should handle mode detection edge cases', (t) => {
    const amount = '1234.56'
    // Test with explicit mode and no currency
    t.is(extenso(amount, { mode: Modes.NUMBER }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')

    // Test with explicit mode and detected currency
    t.is(extenso(getFormattedAmountWithSymbol(amount, 'R$'), { mode: Modes.NUMBER }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')

    // Test with explicit mode and currency code
    t.is(extenso(amount, { mode: Modes.NUMBER, currency: { code: Currencies.BRL } }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})

test('extenso(): should handle all mode detection combinations', (t) => {
    const amount = '1234.56'
    // Test with no mode and no currency
    t.is(extenso(amount), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')

    // Test with no mode and detected currency
    t.is(extenso(getFormattedAmountWithSymbol(amount, 'R$')), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')

    // Test with no mode and currency code
    t.is(extenso(amount, { currency: { code: Currencies.BRL } }), 'mil duzentos e trinta e quatro reais e cinquenta e seis centavos')

    // Test with no mode and both detected currency and currency code
    t.is(extenso(getFormattedAmountWithSymbol(amount, 'R$'), { currency: { code: Currencies.EUR } }), 'mil duzentos e trinta e quatro euros e cinquenta e seis cêntimos')
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
    t.is(extenso('1234.56', { mode: 'INVALID' }), 'mil duzentos e trinta e quatro inteiros e cinquenta e seis centésimos')
})