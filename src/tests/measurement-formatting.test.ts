import test from 'ava'
import extenso from '../index'
import type { ExtensoOptions } from '../types'

const meters: ExtensoOptions = {
    mode: 'measurement',
    unit: { singular: 'metro', plural: 'metros', gender: 'male' },
}

test('decimal measurements preserve their unit and use de with its singular name', t => {
    t.is(extenso('0.2', meters), 'dois décimos de metro')
    t.is(extenso('0.02', meters), 'dois centésimos de metro')
    t.is(extenso('0.01', meters), 'um centésimo de metro')
    t.is(extenso('2.5', meters), 'dois inteiros e cinco décimos de metro')
    t.is(extenso('-0.2', meters), 'menos dois décimos de metro')
    t.is(extenso('0,2', {
        ...meters, decimalSeparator: 'comma',
    }), 'dois décimos de metro')
    t.is(extenso(0.2, {
        ...meters, decimalSeparator: 'comma',
    }), 'dois décimos de metro')
})

test('decimal measurement formatting respects gender, locale, scale, and text options', t => {
    const tonnes: ExtensoOptions = {
        mode: 'measurement',
        unit: { singular: 'tonelada', plural: 'toneladas', gender: 'female' },
    }

    t.is(extenso('0.2', tonnes), 'dois décimos de tonelada')
    t.is(extenso('1.2', tonnes), 'uma inteira e dois décimos de tonelada')
    t.is(extenso('2.2', tonnes), 'duas inteiras e dois décimos de tonelada')
    t.is(extenso('0.16', {
        ...meters, locale: 'pt',
    }), 'dezasseis centésimos de metro')
    t.is(extenso('0.000000002', {
        ...meters, scale: 'long',
    }), 'dois milésimos milionésimos de metro')
    t.is(extenso('0.000000002', {
        ...meters, scale: 'short',
    }), 'dois bilionésimos de metro')
    t.is(extenso('-0.2', {
        ...meters, textCase: 'upper', removeAccents: true,
    }), 'MENOS DOIS DECIMOS DE METRO')
})

test('zero decimal places preserve integer measurement agreement', t => {
    t.is(extenso('-0.00', meters), 'zero metros')
    t.is(extenso('1.00', meters), 'um metro')
    t.is(extenso('2.00', meters), 'dois metros')
    t.is(extenso('1000000.00', meters), 'um milhão de metros')
})
