import test from 'ava'
import TextCases from '../text-cases.enum'

test('TextCases enum values', (t) => {
    t.deepEqual(Object.values(TextCases), ['lower', 'title', 'upper'])
})
