import test from 'ava'
import { getFormattedAmount, getFormattedAmountWithSymbol } from './test-helpers'

test('getFormattedAmount(): should handle string amounts', (t) => {
    t.is(getFormattedAmount('123.45', 'BRL'), '123.45 BRL')
})

test('getFormattedAmount(): should handle number amounts', (t) => {
    t.is(getFormattedAmount(123.45, 'BRL'), '123.45 BRL')
})

test('getFormattedAmountWithSymbol(): should handle string amounts', (t) => {
    t.is(getFormattedAmountWithSymbol('123.45', 'R$'), 'R$ 123.45')
})

test('getFormattedAmountWithSymbol(): should handle number amounts', (t) => {
    t.is(getFormattedAmountWithSymbol(123.45, 'R$'), 'R$ 123.45')
}) 