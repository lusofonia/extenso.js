import test from 'ava'
import formatTextCase from '../format-text-case'
import TextCases from '../../ts/enum/text-cases.enum'

test('formatTextCase(): should apply lower, upper, and title casing', (t) => {
    t.is(formatTextCase('Cento E TRÊS', TextCases.LOWER), 'cento e três')
    t.is(formatTextCase('cento e três', TextCases.UPPER), 'CENTO E TRÊS')
    t.is(
        formatTextCase('menos um milhão de reais e três centavos', TextCases.TITLE),
        'Menos Um Milhão de Reais e Três Centavos',
    )
    t.is(formatTextCase('por cento', TextCases.TITLE), 'Por Cento')
})
