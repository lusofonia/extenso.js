import test from 'ava'
import extenso from '../index'
import Modes from '../ts/enum/modes.enum'
import Currencies from '../ts/enum/currencies.enum'

test('Performance: Large numbers', (t) => {
    const startTime = process.hrtime.bigint()
    
    // Test with a large number
    const result = extenso('1234567890123456789012345678901234567890')
    
    const endTime = process.hrtime.bigint()
    const executionTime = Number(endTime - startTime) / 1_000_000 // Convert to milliseconds
    
    // Assert that the execution time is reasonable (less than 100ms)
    t.true(executionTime < 100, `Execution time (${executionTime}ms) should be less than 100ms`)
    t.truthy(result)
})

test('Performance: Currency mode with large numbers', (t) => {
    const startTime = process.hrtime.bigint()
    
    // Test with a large currency amount
    const result = extenso('1234567890123456789012345678901234567890.99', {
        mode: Modes.CURRENCY,
        currency: { code: Currencies.BRL }
    })
    
    const endTime = process.hrtime.bigint()
    const executionTime = Number(endTime - startTime) / 1_000_000 // Convert to milliseconds
    
    // Assert that the execution time is reasonable (less than 100ms)
    t.true(executionTime < 100, `Execution time (${executionTime}ms) should be less than 100ms`)
    t.truthy(result)
})

test('Performance: Multiple operations', (t) => {
    const startTime = process.hrtime.bigint()
    
    // Test multiple operations
    for (let i = 0; i < 100; i++) {
        extenso(i.toString())
        extenso(i.toString(), { mode: Modes.CURRENCY, currency: { code: Currencies.BRL } })
        extenso(i.toString(), { mode: Modes.DIGIT })
    }
    
    const endTime = process.hrtime.bigint()
    const executionTime = Number(endTime - startTime) / 1_000_000 // Convert to milliseconds
    
    // Assert that the execution time is reasonable (less than 500ms for 300 operations)
    t.true(executionTime < 500, `Execution time (${executionTime}ms) should be less than 500ms for 300 operations`)
}) 