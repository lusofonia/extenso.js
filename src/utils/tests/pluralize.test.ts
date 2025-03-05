import test from 'ava'
import pluralize from '../pluralize'

test('pluralize(): should return singular form when count is 1', t => {
    t.is(pluralize('apple', 1), 'apple')
    t.is(pluralize('banana', 1), 'banana')
    t.is(pluralize('orange', 1), 'orange')
})

test('pluralize(): should return plural form when count is not 1', t => {
    t.is(pluralize('apple', 0), 'apples')
    t.is(pluralize('banana', 2), 'bananas')
    t.is(pluralize('orange', 10), 'oranges')
})
