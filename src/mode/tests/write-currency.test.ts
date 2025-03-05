import test from 'ava'
import writeCurrency from '../write-currency'
import Currencies from '../../ts/enum/currencies.enum'
import Scales from '../../ts/enum/scales.enum'

test('writeCurrency(): should handle BRL currency', (t) => {
    t.is(writeCurrency('1'), 'um real')
    t.is(writeCurrency('2'), 'dois reais')
    t.is(writeCurrency('1', '50'), 'um real e cinquenta centavos')
    t.is(writeCurrency('2', '5'), 'dois reais e cinquenta centavos')
    t.is(writeCurrency('0', '0'), 'zero reais')
    t.is(writeCurrency('0', '1'), 'dez centavos')
    t.is(writeCurrency('0', '5'), 'cinquenta centavos')
    t.is(writeCurrency('0', '05'), 'cinco centavos')
    t.is(writeCurrency('0', '25'), 'vinte e cinco centavos')
    t.is(writeCurrency('5', '01'), 'cinco reais e um centavo')
    t.is(writeCurrency('1000000'), 'um milhão de reais')
    t.is(writeCurrency('1000011'), 'um milhão e onze reais')
    t.is(writeCurrency('2000000', '50'), 'dois milhões de reais e cinquenta centavos')
})

test('writeCurrency(): should handle EUR currency', (t) => {
    t.is(writeCurrency('1', '0', Currencies.EUR), 'um euro')
    t.is(writeCurrency('2', '0', Currencies.EUR), 'dois euros')
    t.is(writeCurrency('1', '50', Currencies.EUR), 'um euro e cinquenta cêntimos')
    t.is(writeCurrency('2', '5', Currencies.EUR), 'dois euros e cinquenta cêntimos')
    t.is(writeCurrency('0', '0', Currencies.EUR), 'zero euros')
    t.is(writeCurrency('0', '1', Currencies.EUR), 'dez cêntimos')
    t.is(writeCurrency('0', '5', Currencies.EUR), 'cinquenta cêntimos')
    t.is(writeCurrency('0', '05', Currencies.EUR), 'cinco cêntimos')
    t.is(writeCurrency('0', '25', Currencies.EUR), 'vinte e cinco cêntimos')
    t.is(writeCurrency('5', '01', Currencies.EUR), 'cinco euros e um cêntimo')
    t.is(writeCurrency('1000000', '0', Currencies.EUR), 'um milhão de euros')
    t.is(writeCurrency('1000011', '0', Currencies.EUR), 'um milhão e onze euros')
    t.is(writeCurrency('2000000', '50', Currencies.EUR), 'dois milhões de euros e cinquenta cêntimos')
})

test('writeCurrency(): should handle BRL currency with long scale', (t) => {
    t.is(writeCurrency('1000000', '0', Currencies.BRL, Scales.LONG), 'um milhão de reais')
    t.is(writeCurrency('1000000000', '0', Currencies.BRL, Scales.LONG), 'um mil milhão de reais')
    t.is(writeCurrency('1000000000000', '0', Currencies.BRL, Scales.LONG), 'um bilhão de reais')
    t.is(writeCurrency('1000000000000000', '0', Currencies.BRL, Scales.LONG), 'um mil bilhão de reais')
    t.is(writeCurrency('1000000000000000000', '0', Currencies.BRL, Scales.LONG), 'um trilhão de reais')
})

test('writeCurrency(): should handle invalid currency', (t) => {
    // @ts-expect-error - this is expected to throw
    t.throws(() => writeCurrency('1', '0', 'INVALID'))
})
