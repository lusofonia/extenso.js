<div align="center">

[_If you don't speak Portuguese, check out the English version of this README here._](https://github.com/lusofonia/extenso.js/blob/master/README-english.md)

[_Caso queira de uma consultoria particular entre em contato comigo aqui._](https://esyyuh0nxyf.typeform.com/to/AbbttY1R)

</div>

***

<div align="center">
  <h1>Extenso.js</h1>
  Uma biblioteca avançada para escrever números por extenso (em português).
  <br />
  <br />

  [![Tests](https://github.com/lusofonia/extenso.js/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/ci-tests.yml)
  [![CodeQL](https://github.com/lusofonia/extenso.js/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/github-code-scanning/codeql)
  [![Dependabot Updates](https://github.com/lusofonia/extenso.js/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/dependabot/dependabot-updates)
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lusofonia_extenso.js&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lusofonia_extenso.js)

  [![Doar Pix (Brasil)](https://img.shields.io/badge/Donate-Pix%20(Brasil)-blue.svg)](https://nubank.com.br/cobrar/193y02/67a7cf95-b24c-4a98-95b2-9ce5daf03e2c)
  [![Doar GitHub Sponsors](https://img.shields.io/badge/Donate-GitHub%20Sponsors-blue.svg)](https://github.com/sponsors/theuves)
  [![Doar PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?hosted_button_id=3TPLED2TF5874)
</div>

***

O projeto Extenso.js foi criado com o objetivo de fornecer uma solução simples e eficiente para a conversão de números para texto em português. 

A motivação por trás deste projeto é atender a uma necessidade comum em diversas aplicações financeiras, educativas e administrativas, onde é frequentemente necessário converter valores numéricos em palavras para fins de documentação, cheques, faturas e outros documentos formais.

Nossa ambição com o Extenso.js é tornar esta biblioteca uma referência para desenvolvedores que precisam dessa funcionalidade em suas aplicações, promovendo a padronização e simplificação do processo de conversão de números para texto.

## Funcionalidades

- [x] Suporte a números de até duodecilhões (10³⁹ ou 10⁷²).
- [x] Suporte a números negativos e decimais.
- [x] Suporte a múltiplas moedas (BRL, EUR, USD e mais).
- [x] Suporte a diferentes dialetos do português (Brasil e Portugal).
- [x] Suporte a BigInt para números extremamente grandes.
- [x] Suporte à escala curta e longa de números.
- [x] Suporte à personalização de gênero gramatical.
- [x] Suporte à formatação flexível (vírgula ou ponto como separador decimal).
- [x] Zero dependências.

_**NOTA**: Observe que 10³⁹ é o limite para a escala curta enquanto que 10⁷² é o limite para a escala longa._

## Instalação

```bash
npm install extenso
```

Ou se preferir, com Yarn:

```bash
yarn add extenso
```

## Uso

ESM:

```js
import extenso from 'extenso'

extenso(123)
//=> 'cento e vinte e três'
```

CommonJS:

```js
const extenso = require('extenso')

extenso(123)
//=> 'cento e vinte e três'
```

TypeScript:

```ts
import extenso, { type ExtensoOptions } from 'extenso'

const options: ExtensoOptions = { mode: 'number' }
const result: string = extenso(123, options)
```

Também são exportados os tipos `CurrencyOptions`, `NumberOptions`, `ExtensoMode`, `ExtensoLocale`, `ExtensoScale`, `ExtensoGender`, `CurrencyCode` e `DecimalSeparator`.

O pacote requer Node.js 18 ou mais recente.

## Sintaxe

```js
extenso(number[, options])
```

## `number` [*string*, *number*, *bigint*]

> O valor que deverá ser escrito por extenso (obrigatório).

Entradas `number` finitas, inclusive quando o JavaScript as representa em notação científica, são aceitas e normalizadas antes da conversão. O valor já precisa ser representável com a precisão desejada pelo tipo `number`: para inteiros maiores que `Number.MAX_SAFE_INTEGER`, use `string` ou `bigint`. `bigint` aceita somente inteiros.

Strings preservam todos os dígitos fornecidos. O sinal `-` só pode aparecer no início. Quando houver agrupamento, o primeiro grupo deve ter de um a três dígitos e os demais exatamente três. O separador decimal precisa ser seguido por dígitos; entradas incompletas como `1.` são rejeitadas.

## `options` [*object*]

> Opções de escrita (opcional).

- [`mode`](#optionsmode-string) [*string*]
- [`scale`](#optionsscale-string) [*string*]
- [`locale`](#optionslocale-string) [*string*]
- [`currency.code`](#optionscurrencycode-string) [*string*]
- [`number.gender`](#optionsnumbergender-string) [*string*]
- [`decimalSeparator`](#optionsdecimalseparator-string) [*string*]

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

As escalas curta e longa são dois sistemas de escrita dos números. A escala curta é a utilizada no Brasil, enquanto a escala longa é utilizada no restante dos países de língua portuguesa.

A escrita diverge somente em números iguais ou superiores a um milhar de milhões (≥10⁹), números inferiores a isso seguem com a escrita idêntica em ambas as escalas.

*Mais informações [aqui](https://pt.wikipedia.org/wiki/Escalas_curta_e_longa) [Wikipédia].*

- `short` [*default*] - Para escrever o número utilizando a escala curta.
- `long` - Para escrever o número utilizando a escala longa.

Exemplos:

```js
extenso('2,000,000,001')
//=> 'dois bilhões e um'

extenso('2,000,000,001', { scale: 'short' })
//=> 'dois bilhões e um'

extenso('2,000,000,001', { scale: 'long' })
//=> 'dois mil milhões e um'
```

## `options.decimalSeparator` [*string*]

> Define o separador de inteiro e decimal.

Por padrão, o ponto é o separador decimal (`point`) e a vírgula é o separador de milhares. Use `comma` para inverter essa interpretação. A opção é especialmente importante para strings, pois entradas `number` são normalizadas diretamente da representação do JavaScript.

Observe que caso o separador decimal seja `point` (.) então o separador de milhar automaticamente será `comma` (,) e vice-versa.

- `point` [*default*] - Para usar **ponto** como separador (ex.: `3.14`).
- `comma` - Para usar **vírgula** como separador (ex.: `3,14`).

Exemplos:

```js
extenso('3.14')
//=> 'três inteiros e quatorze centésimos'

extenso('3,14', { decimalSeparator: 'comma' })
//=> 'três inteiros e quatorze centésimos'

extenso('3.14', { decimalSeparator: 'point' })
//=> 'três inteiros e quatorze centésimos'
```

## `options.locale` [*string*]

> Define a localização (dialeto) para a escrita.

A escrita de alguns números pode variar de país para país (e talvez até de região para região); por exemplo, o número 16 é escrito *dezesseis* no Brasil, enquanto em Portugal é escrito *dezasseis*. A configuração dessas diferenças é feita aqui.

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

extenso('1,000,000,000', { locale: 'br' })
//=> 'um bilhão'

extenso('1,000,000,000', { locale: 'pt' })
//=> 'um bilião'
```

## `options.currency.code` [*string*]

> Define o código [ISO](https://pt.wikipedia.org/wiki/ISO_4217) da moeda em que o número deverá ser escrito.

Até o momento são suportadas apenas 9 moedas escolhidas com base na importância econômica e comercial de cada uma delas e que são as mais utilizadas nos países membros da [CPLP (Comunidade dos Países de Língua Portuguesa)](https://www.cplp.org/), os quais são: Brasil, Angola, Cabo Verde, Guiné-Bissau, Guiné Equatorial, Moçambique, Portugal, São Tomé e Príncipe e Timor-Leste.

_Em breve será suportada a definição de moedas personalizadas. Você pode contribuir enviando um [*pull request*](https://github.com/lusofonia/extenso.js/pulls) com a adição de uma nova moeda ou com a correção de um erro em uma moeda já existente._

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

extenso('42', { mode: 'currency', currency: { code: 'BRL' } })
//=> 'quarenta e dois reais'

extenso('42', { mode: 'currency', currency: { code: 'EUR' } })
//=> 'quarenta e dois euros'

extenso('42', { mode: 'currency', currency: { code: 'CVE' } })
//=> 'quarenta e dois escudos'
```

## `options.number.gender` [*string*]

> Define a flexão de gênero do número que será escrito.

O gênero feminino flexiona unidades, dezenas e centenas (`uma`, `duas`, `duzentas`, `trezentas` etc.), inclusive no grupo dos milhares. Os nomes de escala como `milhão` e `bilhão` permanecem masculinos.

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

extenso('322000', { number: { gender: 'female' } })
//=> 'trezentas e vinte e duas mil'
```

## Valores monetários

No modo `currency`, são aceitas zero, uma ou duas casas decimais. Uma casa é completada com zero à direita (`1.1` equivale a dez centavos). Mais de duas casas são rejeitadas sem truncamento ou arredondamento. Códigos e símbolos podem aparecer antes ou depois do valor; marcadores de moedas diferentes na mesma entrada são considerados ambíguos e geram erro. `currency.code` tem prioridade sobre uma única moeda detectada.

## Validação e erros

`mode`, `locale`, `scale`, `decimalSeparator`, `number.gender` e `currency.code` são validados em runtime. A biblioteca também rejeita entrada vazia, sinal isolado, agrupamento inválido, decimal incompleto, `NaN`, infinitos, moedas conflitantes, valores acima da escala escolhida e strings com mais de 1000 caracteres.

## Migração para a próxima versão

Esta preparação inclui mudanças incompatíveis: CommonJS agora retorna a função diretamente; formatos numéricos anteriormente tolerados podem gerar erro; moeda não aceita mais de duas casas; e opções desconhecidas não usam valores padrão silenciosamente. A próxima versão ainda não foi publicada e seu número será decidido pelo mantenedor.

## Idioma Padrão

O idioma padrão do Extenso.js é o Português Brasileiro. Esta escolha se deve a vários fatores:

1. **Origem do Projeto**: O Extenso.js foi criado no Brasil, onde a necessidade de converter números para texto em português é bastante comum em diversas aplicações.
2. **População Falante**: O Brasil possui a maior população de falantes de português no mundo, o que torna o Português Brasileiro a variante mais amplamente utilizada do idioma.
3. **Moeda Utilizada**: Embora o Euro seja uma moeda importante globalmente, o Real (BRL) é a moeda mais utilizada pelos falantes de português, especialmente no Brasil.
4. **Separador Decimal**: A opção `decimalSeparator` permite escolher explicitamente ponto ou vírgula sem alterar o dialeto de saída.

Esses fatores contribuem para que o Português Brasileiro seja o idioma padrão do Extenso.js, garantindo que a biblioteca atenda às necessidades da maioria dos seus usuários.

## Contribuições

Você é de Portugal, Angola, Moçambique ou de qualquer outro país onde se fala português? Percebeu alguma diferença na forma como os números são escritos no seu país? Caso tenha identificado variações, abra uma issue para discutirmos como adaptar essas características ao projeto e torná-lo mais completo.

Se encontrou algum erro ou algo que possa ser aprimorado, há diferentes formas de contribuir:

- Abrindo uma issue para relatar sugestões ou problemas.
- Enviando um pull request com melhorias.
- Comentando diretamente no trecho do código que pode ser aprimorado.

Toda contribuição é bem-vinda.

## Licença

Criado e mantido por [Matheus Alves](https://github.com/theuves).

Licenciado sob a licença [MIT](https://github.com/lusofonia/extenso.js/blob/master/LICENSE) © 2015-2025
