import translate from '../translate'
import Locales from '../../ts/enum/locales.enum'
import test from 'ava'

test('translate(): should return the same text for BR locale', t => {
    t.is(translate('quatorze', Locales.BR), 'quatorze')
    t.is(translate('dezesseis', Locales.BR), 'dezesseis')
    t.is(translate('dezessete', Locales.BR), 'dezessete')
    t.is(translate('dezenove', Locales.BR), 'dezenove')
})

test('translate(): should replace specific words for PT locale', t => {
    t.is(translate('quatorze', Locales.PT), 'catorze')
    t.is(translate('dezesseis', Locales.PT), 'dezasseis')
    t.is(translate('dezessete', Locales.PT), 'dezassete')
    t.is(translate('dezenove', Locales.PT), 'dezanove')
})

test('translate(): should replace suffixes for PT locale', t => {
    t.is(translate('milhão', Locales.PT), 'milhão')
    t.is(translate('milhões', Locales.PT), 'milhões')
    t.is(translate('bilhão', Locales.PT), 'bilião')
    t.is(translate('bilhões', Locales.PT), 'biliões')
    t.is(translate('trilhão', Locales.PT), 'trilião')
    t.is(translate('trilhões', Locales.PT), 'triliões')
})

test('translate(): should use non-Brazilian forms for other locales', t => {
    for (const locale of [
        Locales.AO,
        Locales.CV,
        Locales.GW,
        Locales.MO,
        Locales.MZ,
        Locales.ST,
    ]) {
        t.is(translate('dezesseis bilhões', locale), 'dezasseis biliões')
    }
})
