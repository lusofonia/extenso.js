<div align="center">
  <h1>Extenso.js</h1>
  <i> An advanced library for writing numbers in words (in Portuguese).</i>
  <br />
  <br />

  [![Node.js CI](https://github.com/lusofonia/extenso.js/actions/workflows/node.js.yml/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/node.js.yml)
  [![CodeQL](https://github.com/lusofonia/extenso.js/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/github-code-scanning/codeql)
  [![Dependabot Updates](https://github.com/lusofonia/extenso.js/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/dependabot/dependabot-updates)
  ![Version 2.1.0](https://img.shields.io/badge/Version-2.1.0-green)
  ![License MIT](https://img.shields.io/badge/License-MIT-blue)
</div>

***

O projeto Extenso.js foi criado com o objetivo de fornecer uma solução simples e eficiente para a conversão de números para texto em português. 

A motivação por trás deste projeto é atender a uma necessidade comum em diversas aplicações financeiras, educativas e administrativas, onde é frequentemente necessário converter valores numéricos em palavras para fins de documentação, cheques, faturas e outros documentos formais.

Nossa ambição com o Extenso.js é tornar esta biblioteca uma referência para desenvolvedores que precisam dessa funcionalidade em suas aplicações, promovendo a padronização e simplificação do processo de conversão de números para texto.

## Funcionalidades

- [x] Suporte de até duodecilhões (10³⁹ ou 10⁷²)
- [x] Números negativos e decimais
- [x] Múltiplas moedas (BRL, EUR, USD e mais)
- [x] Escala curta e longa de números
- [x] Suporte a diferentes dialetos (Brasil e Portugal)
- [x] Personalização de gênero gramatical
- [x] Compatível com `BigInt` para números extremamente grandes
- [x] Formatação flexível (vírgula ou ponto como separador decimal)
- [x] Zero dependências

_**NOTA**: Observe que 10³⁹ é o limite para a escala curta enquanto que 10⁷² é o limite para a escala longa._

## Instalação

```bash
npm install extenso
```

Ou se preferir, com Yarn: `yarn add extenso`.

## Uso

```js
import extenso from 'extenso'
```

## Sintaxe

```js
// extenso(number[, options])
```

## `number` [*string*, *number*, *bigint*]

_**NOTA**: Parâmetro obrigatório._

> O valor que deverá ser escrito por extenso.

Se o valor for do tipo `number`, recomenda-se que ele seja um número com parte inteira segura, ou seja, o valor deve ser válido na verificação com `Number.isSafeInteger()`, caso contrário, é recomendado que os números sejam encapsulados em *string* devido ao fato de que, no JavaScript, números (do tipo `number`) maiores que 9 quatrilhões perdem precisão. Alternativamente, pode-se utilizar números `BigInt` (do tipo `bigint`) adicionando `n` no final, por exemplo, `10000000000000001n` ([leia este artigo para mais informações](https://bit.ly/tableless-bigint)), porém você estará limitado a números inteiros apenas, não podendo representar números decimais.

Números envolvidos em *strings* deverão seguir o formato natural de escrita de números. Você pode usar `-` no início para representar números negativos e vírgula (`,`) ou ponto (`.`) para separação de milhares e decimais, seguindo, por padrão, o formato de escrita do Brasil (ou seja, com vírgula como separador decimal). Esse formato pode ser alterado conforme a preferência, utilizando o parâmetro `number.decimalSeparator` como será visto mais adiante.

## `options` [*object*]

_**NOTA**: Parâmetro opcional._

> Opções de escrita.

- [`mode`](#optionsmode-string) [*string*]
- [`locale`](#optionslocale-string) [*string*]
- [`scale`](#optionsscale-string) [*string*]
- [`currency`](#optionscurrency-object) [*object*]
- [`currency.type`](#optionscurrencytype-string) [*string*]
- [`number`](#optionsnumber-object) [*object*]
- [`number.gender`](#optionsnumbergender-string) [*string*]
- [`number.decimalSeparator`](#optionsnumberdecimalsseparator-string) [*string*]

## `options.mode` [*string*]

> Define o modo de escrita do número.

Opções disponíveis:

- `number` [*default*] - Escrever somente o número por extenso.
- `currency` - Escrever o número como valor monetário.
- `digit` - Escrever o número por extenso em dígitos.

Exemplos:

```js
extenso('123')
//=> 'cento e vinte e três'

extenso('123', { mode: 'number' })
//=> 'cento e vinte e três'

extenso('123', { mode: 'currency' })
//=> 'cento e vinte e três reais'

extenso('123', { mode: 'digit' })
//=> 'um dois três'
```

## `options.scale` [*string*]

> Define a escala de escrita (curta ou longa).

As escalas curta e longa são dois sistemas de escrita dos números. A escala curta é a utilizado no Brasil, enquanto que a escala longa é a utilizada no restante dos paises de lingua portuguesa.

A escrita diverge somente em números iguais ou superiores a um milhar de milhões (≥10⁹), números inferiores a isso seguem com a escrita idêntica em ambas as escalas.

*Mais informações [aqui](https://pt.wikipedia.org/wiki/Escalas_curta_e_longa) [Wikipédia].*

- `short` [*default*] - Para escrever o número utilizando a escala curta.
- `long` - Para escrever o número utilizando a escala longa.

Exemplos:

```js
extenso('2.000.000.001')
//=> 'dois bilhões e um'

extenso('2.000.000.001', { scale: 'short' })
//=> 'dois bilhões e um'

extenso('2.000.000.001', { scale: 'long' })
//=> 'dois mil milhões e um'
```

## `options.locale` [*string*]

> Define a localização (dialeto) para a escrita.

A escrita de alguns números pode váriar de país para país (e talvez até de região para região), por exemplo, o número 16 é escrito *dezesseis* no Brasil, enquanto que em Portugal é escrito *dezasseis*. A configuração dessas diferenças é feita aqui.

Até o momento, são suportados os dialetos `br` e `pt` de acordo as diferenças conhecidas entre o português do Brasil e o português de Portugal. Caso você necessite de um dialeto diferente, abra uma [*issue*](https://github.com/lusofonia/extenso.js/issues) e vamos discutir como adaptar essas caracteristicas ao projeto para deixá-lo o mais completo possível.

- `br` [*default*] - Para escrever no dialeto do Brasil.
- `pt` - Para escrever no dialeto de Portugal.

Exemplos:

```js
extenso('16')
//=> 'dezesseis'

extenso('16', { locale: 'br' })
//=> 'dezesseis'

extenso('16', { locale: 'pt' })
//=> 'dezasseis'

extenso('1.000.000.000', { locale: 'br' )
//=> 'um bilhão'

extenso('1.000.000.000', { locale: 'pt' })
//=> 'um bilião'
```

## `options.currency.type` [*string*]

> Define o código [ISO](https://pt.wikipedia.org/wiki/ISO_4217) da moeda em que o número deverá ser escrito.

Até o momento são suportadas apenas 9 moedas escolhidas com base na importância econômica e comercial de cada uma delas e que são as mais utilizadas nos países membros da CPLP (Comunidade dos Países de Língua Portuguesa), os quais são: Brasil, Angola, Cabo Verde, Guiné Bissau, Guiné Equatorial, Moçambique, Portugal, São Tomé e Príncipe e Timor-Leste.

Em breve será suportado a definição de moedas personalizadas. Você pode contribuir enviando um [*pull request*](https://github.com/lusofonia/extenso.js/pulls) com a adição de uma nova moeda ou com a correção de um erro em uma moeda já existente.

As moedas suportadas são:

- `BRL` [*default*] - Real brasileiro
- `AOA` - Kwanza angolano
- `CVE` - Escudo cabo-verdiano
- `XOF` - Franco CFA de África Ocidental
- `MZN` - Metical moçambicano
- `EUR` - Euro
- `STN` - Dobra de São Tomé e Príncipe
- `USD` - Dólar americano
- `MOP` - Pataca de Macau

Exemplos:

```js
extenso('42', { mode: 'currency' })
//=> 'quarenta e dois reais'

extenso('42', { mode: 'currency', currency: { type: 'BRL' } })
//=> 'quarenta e dois reais'

extenso('42', { mode: 'currency', currency: { type: 'EUR' } })
//=> 'quarenta e dois euros'

extenso('42', { mode: 'currency', currency: { type: 'CVE' } })
//=> 'quarenta e dois escudos'

extenso('42', { mode: 'currency', currency: { type: 'MZN' } })
//=> 'quarenta e dois meticais'
```

## `options.number.gender` [*string*]

> Define a flexão de gênero do número que será escrito.

Atualmente na língua portuguesa [somente os números 1 e 2 podem ser escritos tanto no modo masculino quanto no modo feminino](https://pt.wikipedia.org/wiki/Dual), por exemplo, *1* pode ser escrito como *um* ou *uma* e *2* pode ser escrito como *dois* ou *duas*. Caso você precisque que o número esteja escrito no gênero feminino então pode usar `female` para defini-lo.

- `male` [*default*] - Para escrever no modo masculino.
- `female` - Para escrever no modo feminino.

Exemplos:

```js
extenso('42')
//=> 'quarenta e dois'

extenso('42', { number: { gender: 'male' } })
//=> 'quarenta e dois'

extenso('42', { number: { gender: 'female' } })
//=> 'quarenta e duas'
```

## `options.number.decimalSeparator` [*string*]

> Define o separador de inteiro e decimal.

Atualmente no português o separador de inteiro e decimal mais comum utilizado é a vírgula (`comma`), porém em outros países pode ser necessário utilizar o ponto como separador de decimal. Nesse caso você pode utilizar o parâmetro `number.decimalSeparator` para definir outro separador de decimal (`dot`), no entanto, isso só é necessário se o número fornecido esteja encapsulado em *string*.

Observe que caso o separador decimal seja `dot` (.) então o separador de milhar automaticamente será a vírgula (`,`) e vice-versa.

- `comma` [*default*] - Para usar **vírgula** como separador (ex. `3,14`).
- `dot` - Para usar **ponto** como separador (ex.: `3.14`)

Exemplos:

```js
extenso('3,14')
//=> 'três inteiros e quatorze centésimos'

extenso('3,14', { number: { decimalSeparator: 'comma' } })
//=> 'três inteiros e quatorze centésimos'

extenso('3.14', { number: { decimalSeparator: 'dot' } })
//=> 'três inteiros e quatorze centésimos'
```

## Contribuições

Você é de Portugal, Angola, Moçambique ou de qualquer outro país onde se fala português? Percebeu alguma diferença na forma como os números são escritos no seu país? Caso tenha identificado variações, abra uma issue para discutirmos como adaptar essas características ao projeto e torná-lo mais completo.

Se encontrou algum erro ou algo que possa ser aprimorado, há diferentes formas de contribuir:

- Abrindo uma issue para relatar sugestões ou problemas.
- Enviando um pull request com melhorias.
- Comentando diretamente no trecho do código que pode ser aprimorado.

Toda contribuição é bem-vinda.

## Licença

MIT &copy; Matheus Alves
