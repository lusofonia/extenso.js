import test from 'ava'
import writeLowerThan1000 from '../write-lower-than-1000'

test('writeLowerThan1000()', (t) => {
    t.is(writeLowerThan1000(1), 'um')
    t.is(writeLowerThan1000(2), 'dois')
    t.is(writeLowerThan1000(10), 'dez')
    t.is(writeLowerThan1000(15), 'quinze')
    t.is(writeLowerThan1000(30), 'trinta')
    t.is(writeLowerThan1000(35), 'trinta e cinco')
    t.is(writeLowerThan1000(100), 'cem')
    t.is(writeLowerThan1000(101), 'cento e um')
    t.is(writeLowerThan1000(110), 'cento e dez')
    t.is(writeLowerThan1000(135), 'cento e trinta e cinco')
})
