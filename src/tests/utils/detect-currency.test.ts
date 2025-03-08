import test from 'ava'
import detectCurrency from '../../utils/detect-currency'
import { currencyTestCases, invalidCurrencyTestCases } from './test-helpers'
import Currencies from '../../ts/enum/currencies.enum'

test('detectCurrency(): should detect all currency formats', (t) => {
    for (const testCase of currencyTestCases) {
        t.is(detectCurrency(testCase.input), testCase.expectedCurrency, testCase.description)
    }
})

test('detectCurrency(): should handle decimal numbers', (t) => {
    t.is(detectCurrency('123.45 BRL'), Currencies.BRL)
    t.is(detectCurrency('123,45 EUR'), Currencies.EUR)
    t.is(detectCurrency('123.45USD'), Currencies.USD)
    t.is(detectCurrency('R$123.45'), Currencies.BRL)
})

test('detectCurrency(): should handle negative numbers', (t) => {
    t.is(detectCurrency('-123.45 BRL'), Currencies.BRL)
    t.is(detectCurrency('-123,45 EUR'), Currencies.EUR)
    t.is(detectCurrency('-123.45USD'), Currencies.USD)
    t.is(detectCurrency('-R$123.45'), Currencies.BRL)
})

test('detectCurrency(): should return undefined when no currency is found', (t) => {
    for (const invalidCase of invalidCurrencyTestCases) {
        t.is(detectCurrency(invalidCase), undefined, `Invalid case: ${invalidCase}`)
    }
})