import test from 'ava'
import extenso from '../index'
import type { CurrencyOptions, ExtensoScale } from '../types'
import Locales from '../ts/enum/locales.enum'

test('compound fractions preserve agreement, signs, and scale', t => {
    t.is(extenso('2/10000', { mode: 'fraction' }), 'dois décimos milésimos')
    t.is(extenso('-2/100000', { mode: 'fraction' }), 'menos dois centésimos milésimos')
    t.is(extenso('0/10000', { mode: 'fraction' }), 'zero décimos milésimos')
    t.is(extenso('1/10000', { mode: 'fraction' }), 'um décimo milésimo')
    t.is(extenso('2/1000000000', {
        mode: 'fraction', scale: 'long', locale: 'pt',
    }), 'dois milésimos milionésimos')
    t.is(extenso('-0,000000002', {
        scale: 'long', decimalSeparator: 'comma',
    }), 'menos dois milésimos milionésimos')
    t.is(extenso('0.000000002', { scale: 'short' }), 'dois bilionésimos')
    t.is(extenso('0.000000002', {
        scale: 'long', mode: 'percentage',
    }), 'dois milésimos milionésimos por cento')
})

test('locale translation preserves custom units and currency names resembling scales', t => {
    const unit = { singular: 'grilhão', plural: 'grilhões', gender: 'male' } as const
    const currency = { ...unit, subunit: unit }

    for (const locale of Object.values(Locales)) {
        t.is(extenso('1', { mode: 'measurement', unit, locale }), 'um grilhão')
        t.is(extenso('2', { mode: 'measurement', unit, locale }), 'dois grilhões')
        t.is(extenso('-1.02', { currency, locale }), 'menos um grilhão e dois grilhões')
        t.is(extenso('0.01', { currency, locale }), 'um grilhão')
        t.is(extenso('0', { currency, locale }), 'zero grilhões')
    }

    t.is(extenso('2000000000', {
        mode: 'measurement', unit, locale: 'pt',
    }), 'dois biliões de grilhões')
    t.is(extenso('2', {
        currency, locale: 'pt', textCase: 'upper', removeAccents: true,
    }), 'DOIS GRILHOES')
})

test('custom currency subunits follow the same million agreement as units', t => {
    const currency: CurrencyOptions = {
        fractionDigits: 7,
        singular: 'crédito',
        plural: 'créditos',
        gender: 'male',
        subunit: { singular: 'ficha', plural: 'fichas', gender: 'female' },
    }

    for (const scale of ['short', 'long'] satisfies ExtensoScale[]) {
        t.is(extenso('0.1', { currency, scale }), 'um milhão de fichas')
        t.is(extenso('-0.2', { currency, scale }), 'menos dois milhões de fichas')
        t.is(extenso('0.1000001', { currency, scale }), 'um milhão e uma fichas')
        t.is(extenso('0.0000001', { currency, scale }), 'uma ficha')
        t.is(extenso('0', {
            currency: { ...currency, showZeroSubunit: true }, scale,
        }), 'zero fichas')
        t.is(extenso('1,2', {
            currency, scale, decimalSeparator: 'comma',
        }), 'um crédito e dois milhões de fichas')
        t.is(extenso('0.09999995', {
            currency: { ...currency, rounding: 'half-up' }, scale,
        }), 'um milhão de fichas')
    }

    t.is(extenso('0.1', {
        currency: { ...currency, fractionDigits: 10 }, locale: 'pt',
    }), 'um bilião de fichas')
    t.is(extenso('0.1', {
        currency: { ...currency, fractionDigits: 10 }, locale: 'pt', scale: 'long',
    }), 'mil milhões de fichas')
})
