import test from 'ava'
import removeAccents from '../remove-accents'

test('removeAccents(): should remove Portuguese diacritical marks', t => {
    t.is(
        removeAccents('três milhões, maçã, órgão e cêntimo'),
        'tres milhoes, maca, orgao e centimo',
    )
})
