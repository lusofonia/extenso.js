import test from 'ava'
import normalize from '../normalize'

test('normalize(): should handle numbers', (t) => {
    t.is(normalize(0), '0')
    t.is(normalize(1), '1')
    t.is(normalize(-1), '-1')
    t.is(normalize(1.5), '1.5')
    t.is(normalize(-1.5), '-1.5')
})

test('normalize(): should handle strings', (t) => {
    t.is(normalize('0'), '0')
    t.is(normalize('1'), '1')
    t.is(normalize('-1'), '-1')
    t.is(normalize('1.5'), '1.5')
    t.is(normalize('-1.5'), '-1.5')
    t.is(normalize('  1.5  '), '1.5')
})

test('normalize(): should handle bigint', (t) => {
    t.is(normalize(BigInt('0')), '0')
    t.is(normalize(BigInt('1')), '1')
    t.is(normalize(BigInt('-1')), '-1')
    t.is(normalize(0n), '0')
    t.is(normalize(1n), '1')
    t.is(normalize(-1n), '-1')
})

test('normalize(): should throw on invalid type', (t) => {
    // @ts-expect-error - this is expected to throw
    t.throws(() => normalize(null))
    // @ts-expect-error - this is expected to throw
    t.throws(() => normalize(undefined))
    // @ts-expect-error - this is expected to throw
    t.throws(() => normalize({}))
    // @ts-expect-error - this is expected to throw
    t.throws(() => normalize([]))
})

test('normalize(): should throw when input exceeds maximum length', (t) => {
    const longString = '1'.repeat(1001)
    t.throws(() => normalize(longString), { message: 'Input exceeds maximum length of 1000 characters' })
})
