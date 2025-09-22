import test from 'ava'
import detectCurrency from '../../utils/detect-currency'
import Currencies from '../../ts/enum/currencies.enum'

test('detectCurrency(): should detect currency codes', (t) => {
    t.is(detectCurrency('123 BRL'), Currencies.BRL)
    t.is(detectCurrency('123 EUR'), Currencies.EUR)
    t.is(detectCurrency('123 USD'), Currencies.USD)
    t.is(detectCurrency('123 AOA'), Currencies.AOA)
    t.is(detectCurrency('123 CVE'), Currencies.CVE)
    t.is(detectCurrency('123 XOF'), Currencies.XOF)
    t.is(detectCurrency('123 MZN'), Currencies.MZN)
    t.is(detectCurrency('123 STN'), Currencies.STN)
    t.is(detectCurrency('123 MOP'), Currencies.MOP)
})

test('detectCurrency(): should detect currency symbols', (t) => {
    t.is(detectCurrency('R$ 123'), Currencies.BRL)
    t.is(detectCurrency('€ 123'), Currencies.EUR)
    t.is(detectCurrency('$ 123'), Currencies.USD)
    t.is(detectCurrency('Kz 123'), Currencies.AOA)
    t.is(detectCurrency('Esc 123'), Currencies.CVE)
    t.is(detectCurrency('CFA 123'), Currencies.XOF)
    t.is(detectCurrency('MT 123'), Currencies.MZN)
    t.is(detectCurrency('Db 123'), Currencies.STN)
    t.is(detectCurrency('MOP$ 123'), Currencies.MOP)
})

test('detectCurrency(): should detect currency codes without spaces', (t) => {
    t.is(detectCurrency('123BRL'), Currencies.BRL)
    t.is(detectCurrency('123EUR'), Currencies.EUR)
    t.is(detectCurrency('123USD'), Currencies.USD)
    t.is(detectCurrency('123AOA'), Currencies.AOA)
    t.is(detectCurrency('123CVE'), Currencies.CVE)
    t.is(detectCurrency('123XOF'), Currencies.XOF)
    t.is(detectCurrency('123MZN'), Currencies.MZN)
    t.is(detectCurrency('123STN'), Currencies.STN)
    t.is(detectCurrency('123MOP'), Currencies.MOP)
})

test('detectCurrency(): should detect currency symbols without spaces', (t) => {
    t.is(detectCurrency('R$123'), Currencies.BRL)
    t.is(detectCurrency('€123'), Currencies.EUR)
    t.is(detectCurrency('$123'), Currencies.USD)
    t.is(detectCurrency('Kz123'), Currencies.AOA)
    t.is(detectCurrency('Esc123'), Currencies.CVE)
    t.is(detectCurrency('CFA123'), Currencies.XOF)
    t.is(detectCurrency('MT123'), Currencies.MZN)
    t.is(detectCurrency('Db123'), Currencies.STN)
    t.is(detectCurrency('MOP$123'), Currencies.MOP)
})

test('detectCurrency(): should handle currency codes in different positions', (t) => {
    t.is(detectCurrency('BRL 123'), Currencies.BRL)
    t.is(detectCurrency('123 EUR'), Currencies.EUR)
    t.is(detectCurrency('123 456 USD'), Currencies.USD)
})

test('detectCurrency(): should handle currency symbols in different positions', (t) => {
    t.is(detectCurrency('R$ 123'), Currencies.BRL)
    t.is(detectCurrency('123 €'), Currencies.EUR)
    t.is(detectCurrency('123 456 $'), Currencies.USD)
})

test('detectCurrency(): should handle multiple currency indicators', (t) => {
    // Should detect the first occurrence
    t.is(detectCurrency('BRL 123 EUR'), Currencies.BRL)
    t.is(detectCurrency('R$ 123 €'), Currencies.BRL)
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
    t.is(detectCurrency('123'), undefined)
    t.is(detectCurrency('123.45'), undefined)
    t.is(detectCurrency('123,45'), undefined)
    t.is(detectCurrency('123 ABC'), undefined)
    t.is(detectCurrency('123 XYZ'), undefined)
    t.is(detectCurrency(''), undefined)
    t.is(detectCurrency('0'), undefined)
    t.is(detectCurrency('-123'), undefined)
})