// import test from 'ava'
// import { addComma, addConjunction, clear, name, singularize, write } from './parts-util'

// /**
//  * Função: addComma
//  */
// test('Deve adicionar vírgula no final de algumas partes', (t) => {
//   t.deepEqual(addComma([ '1 milhão', 'mil e', '42' ]), [ '1 milhão,', 'mil e', '42' ])
//   t.deepEqual(addComma([ '1 milhão', 'mil', '420' ]), [ '1 milhão,', 'mil', '420' ])
// })

/**
 * Função: addConjunction
 */
// test('Deve adicionar "e" no final de algumas partes', (t) => {
//   t.deepEqual(addConjunction([ 'mil', '4' ], '1004'), [ 'mil e', '4' ])
//   t.deepEqual(addConjunction([ 'mil', '42' ], '1042'), [ 'mil e', '42' ])
//   t.deepEqual(addConjunction([ 'mil', '200' ], '1200'), [ 'mil e', '200' ])
//   t.deepEqual(addConjunction([ 'mil', '420' ], '1420'), [ 'mil', '420' ])
// })

// /**
//  * Função: singularize
//  */
// test('Deve singularizar algumas partes', (t) => {
//   t.deepEqual(singularize([ '1 milhões' ]), [ '1 milhão' ])
//   t.deepEqual(singularize([ '1 bilhões' ]), [ '1 bilhão' ])
//   t.deepEqual(singularize([ '2 milhões' ]), [ '2 milhões' ])
//   t.deepEqual(singularize([ '2 bilhões' ]), [ '2 bilhões' ])
// })

// /**
//  * Função: write
//  */
// test('Deve escrever o restante dos números', (t) => {
//   t.deepEqual(write([ '3 mil,', '140' ], 'br'), [ 'três mil,', 'cento e quarenta' ])
//   t.deepEqual(write([ '3 mil e', '14' ], 'br'), [ 'três mil e', 'quatorze' ])
//   t.deepEqual(write([ '3 mil e', '14' ], 'pt'), [ 'três mil e', 'catorze' ])
//   t.deepEqual(write([ '3 mil e', '1' ], 'br'), [ 'três mil e', 'um' ])
//   t.deepEqual(write([ 'mil e', '1' ], 'br'), [ 'mil e', 'um' ])
// })
