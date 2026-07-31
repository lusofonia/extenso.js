<div align="center">

[_If you don't speak Portuguese, check out the English version of this README here._](https://github.com/lusofonia/extenso.js/blob/master/README-english.md)

[_Caso queira uma consultoria particular, entre em contato comigo aqui._](https://esyyuh0nxyf.typeform.com/to/AbbttY1R)

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
- [x] Localidades para todos os países lusófonos e Macau.
- [x] Suporte a BigInt para números extremamente grandes.
- [x] Suporte à escala curta e longa de números.
- [x] Suporte à personalização de gênero gramatical.
- [x] Suporte à formatação flexível (vírgula ou ponto como separador decimal).
- [x] Suporte à escrita abreviada de números.
- [x] Suporte à escrita de percentuais.
- [x] Suporte à escrita de frações comuns.
- [x] Suporte a unidades de medida personalizadas.
- [x] Suporte à escrita sem acentos.
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

Também são exportados os tipos `BuiltInCurrencyOptions`, `CurrencyDefinition`,
`CurrencyFormattingOptions`, `CurrencyOptions`, `CurrencyRounding`,
`MeasurementUnit`, `NumberOptions`, `ExtensoMode`, `ExtensoLocale`, `ExtensoScale`,
`ExtensoGender`, `CurrencyCode` e `DecimalSeparator`.

O pacote requer Node.js 22.20 ou mais recente.

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
- [`currency`](#optionscurrency-object) [*object*]
- [`removeAccents`](#optionsremoveaccents-boolean) [*boolean*]
- [`currency.code`](#optionscurrencycode-string) [*string*]
- [`currency.rounding`](#optionscurrencyrounding-string) [*string*]
- [`currency.showZeroUnit`](#optionscurrencyshowzerounit-boolean) [*boolean*]
- [`currency.showZeroSubunit`](#optionscurrencyshowzerosubunit-boolean) [*boolean*]
- [`currency.fractionDigits`](#optionscurrencyfractiondigits-number) [*number*]
- [`unit`](#optionsunit-object) [*object*]
- [`number.gender`](#optionsnumbergender-string) [*string*]
- [`number.ordinal`](#optionsnumberordinal-boolean) [*boolean*]
- [`decimalSeparator`](#optionsdecimalseparator-string) [*string*]

## `options.mode` [*string*]

> Define o modo de escrita do número.

Opções disponíveis:

- `number` [*default*] - Escrever somente o número por extenso.
- `currency` - Escrever o número como valor monetário.
- `digit` - Escrever cada dígito individualmente por extenso.
- `abbreviated` - Escrever o número em formato abreviado.
- `fraction` - Escrever uma fração no formato `numerador/denominador`.
- `measurement` - Escrever uma quantidade com unidade de medida.
- `percentage` - Escrever o número como percentual.

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

extenso('1500', { mode: 'abbreviated' })
//=> '1,5 mil'

extenso('1500000', { mode: 'abbreviated' })
//=> '1,5 mi'

extenso('12.5', { mode: 'percentage' })
//=> 'doze inteiros e cinco décimos por cento'

extenso('3/4', { mode: 'fraction' })
//=> 'três quartos'

extenso('2.5', {
  mode: 'measurement',
  unit: {
    singular: 'quilograma',
    plural: 'quilogramas',
    gender: 'male'
  }
})
//=> 'dois inteiros e cinco décimos quilogramas'
```

O modo `fraction` aceita numeradores inteiros e denominadores inteiros positivos.
A fração é escrita exatamente como informada, sem simplificação automática.
Denominadores de 2 a 10 usam seus nomes usuais; potências de dez usam formas
como `centésimo` e `milésimo`; os demais são escritos com `avos`.

## `options.unit` [*object*]

> Define a unidade usada pelo modo `measurement`.

Informe os nomes no singular e plural e o gênero gramatical (`male` ou
`female`). A unidade é obrigatória no modo `measurement`. Valores decimais usam
o plural, e múltiplos exatos de um milhão recebem a preposição `de`.

```js
extenso('1000000', {
  mode: 'measurement',
  unit: {
    singular: 'tonelada',
    plural: 'toneladas',
    gender: 'female'
  }
})
//=> 'um milhão de toneladas'
```

## `options.scale` [*string*]

> Define a escala de escrita (curta ou longa).

As escalas curta e longa são dois sistemas de escrita dos números. A escala curta é a utilizada no Brasil, enquanto a escala longa é utilizada no restante dos países de língua portuguesa.

A escrita diverge em números iguais ou superiores a um milhar de milhões
(≥10⁹) e nos denominadores decimais correspondentes (≤10⁻⁹). As frações
respeitam a escala selecionada.

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

extenso('0.000000000001', { scale: 'short' })
//=> 'um trilionésimo'

extenso('0.000000000001', { scale: 'long' })
//=> 'um bilionésimo'
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

São reconhecidas as localidades `ao`, `br`, `cv`, `gw`, `mo`, `mz`, `pt` e
`st`. Exceto pelo Brasil, elas usam atualmente as formas numéricas não
brasileiras (`dezasseis`, `dezassete`, `dezanove`, `bilião` etc.). As diferenças
regionais mais específicas serão incorporadas conforme houver referências
linguísticas verificáveis.

- `br` [*default*] - Para escrever no dialeto do Brasil.
- `ao` - Angola.
- `cv` - Cabo Verde.
- `gw` - Guiné-Bissau.
- `mo` - Macau.
- `mz` - Moçambique.
- `pt` - Portugal.
- `st` - São Tomé e Príncipe.

`locale` controla o vocabulário, enquanto `scale` controla a escala numérica.
Use `scale: 'long'` com as localidades não brasileiras quando quiser a escala
longa adotada nesses países e territórios.

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

## `options.removeAccents` [*boolean*]

> Remove os acentos e outros sinais diacríticos do texto retornado.

- `false` [*default*] - Mantém a acentuação normal.
- `true` - Retorna o número por extenso sem acentos.

Esta opção funciona em todos os modos de escrita e pode ser combinada com qualquer localização.

Exemplos:

```js
extenso('123')
//=> 'cento e vinte e três'

extenso('123', { removeAccents: true })
//=> 'cento e vinte e tres'

extenso('3.14', { removeAccents: true })
//=> 'tres inteiros e quatorze centesimos'
```

## `options.currency` [*object*]

> Configura uma moeda incorporada ou uma definição de moeda personalizada.

Informar `currency`, com um código ou uma definição personalizada, ativa
automaticamente o modo `currency`, exceto quando outro `mode` é definido
explicitamente. Um objeto vazio (`currency: {}`) usa a moeda padrão BRL.

### `options.currency.code` [*string*]

> Define o código [ISO](https://pt.wikipedia.org/wiki/ISO_4217) da moeda em que o número deverá ser escrito.

São suportadas 9 moedas usadas em países e territórios lusófonos ou relevantes
para suas relações econômicas. A seleção contempla membros da
[CPLP (Comunidade dos Países de Língua Portuguesa)](https://www.cplp.org/) e
Macau, onde o português também é língua oficial.

As moedas suportadas são:

| Código | Moeda |
| --- | --- |
| `BRL` [*default*] | Real brasileiro |
| `AOA` | Kwanza angolano |
| `CVE` | Escudo cabo-verdiano |
| `XOF` | Franco CFA de África Ocidental |
| `MZN` | Metical moçambicano |
| `EUR` | Euro |
| `STN` | Dobra de São Tomé e Príncipe |
| `USD` | Dólar americano |
| `MOP` | Pataca de Macau |

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

extenso('2.01', {
  currency: {
    singular: 'crédito',
    plural: 'créditos',
    gender: 'male',
    subunit: {
      singular: 'ficha',
      plural: 'fichas',
      gender: 'female'
    }
  }
})
//=> 'dois créditos e uma ficha'
```

Para uma moeda personalizada, informe os nomes no singular e plural e o gênero
gramatical (`male` ou `female`) da unidade e da subunidade. `code` não pode ser
combinado com uma definição personalizada. A presença da definição ativa
automaticamente o modo `currency`.

### `options.currency.rounding` [*string*]

> Define como tratar casas decimais além da precisão da moeda.

- `reject` [*default*] - Rejeita o valor sem modificá-lo.
- `truncate` - Descarta as casas excedentes.
- `half-up` - Arredonda para o valor mais próximo; empates são afastados de zero.

O cálculo é decimal exato e não converte o valor para ponto flutuante.

### `options.currency.showZeroUnit` [*boolean*]

> Escreve a unidade mesmo quando ela é zero. O padrão é `false`.

### `options.currency.showZeroSubunit` [*boolean*]

> Escreve a subunidade mesmo quando ela é zero. O padrão é `false`.

Ativar as duas opções sempre inclui unidade e subunidade:

```js
extenso('0', {
  currency: {
    code: 'BRL',
    showZeroUnit: true,
    showZeroSubunit: true
  }
})
//=> 'zero reais e zero centavos'
```

### `options.currency.fractionDigits` [*number*]

> Define a quantidade de casas da subunidade de uma moeda personalizada.

Aceita inteiros de 0 a 1000 e usa 2 por padrão. Moedas incorporadas mantêm duas
casas decimais. Esta opção não pode ser combinada com `currency.code`.

```js
extenso('1.2345', {
  currency: {
    fractionDigits: 3,
    rounding: 'half-up',
    singular: 'crédito',
    plural: 'créditos',
    gender: 'male',
    subunit: {
      singular: 'ficha',
      plural: 'fichas',
      gender: 'female'
    }
  }
})
//=> 'um crédito e duzentas e trinta e cinco fichas'
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

## `options.number.ordinal` [*boolean*]

> Define se o número será escrito na forma ordinal.

Esta opção é válida no modo `number` e aceita somente valores inteiros. A opção
`number.gender` também flexiona todos os componentes do ordinal.

- `false` [*default*] - Para escrever o número na forma cardinal.
- `true` - Para escrever o número na forma ordinal.

Exemplos:

```js
extenso('1', { number: { ordinal: true } })
//=> 'primeiro'

extenso('11', { number: { ordinal: true } })
//=> 'décimo primeiro'

extenso('42', { number: { ordinal: true, gender: 'female' } })
//=> 'quadragésima segunda'

extenso('1000', { number: { ordinal: true } })
//=> 'milésimo'
```

## Valores monetários

No modo `currency`, moedas incorporadas aceitam zero, uma ou duas casas
decimais. Uma casa é completada com zero à direita: `1.1` representa uma
unidade e dez subunidades — em BRL, um real e dez centavos. Mais casas são
rejeitadas por padrão; `currency.rounding` permite truncamento ou arredondamento
explícito. Moedas personalizadas podem alterar a precisão com
`currency.fractionDigits`.

A subunidade da dobra de São Tomé e Príncipe (`STN`) é o cêntimo:

```js
extenso('0.01', { currency: { code: 'STN' } })
//=> 'um cêntimo'
```

Códigos e símbolos podem aparecer antes ou depois do valor. Marcadores de
moedas diferentes na mesma entrada são considerados ambíguos e geram erro.
`currency.code` tem prioridade sobre uma única moeda detectada.

No modo `number`, casas decimais formadas somente por zeros não criam uma
fração (`1.00` equivale a `1` e `-0.00` equivale a `0`). O modo `digit`
continua preservando todos os dígitos fornecidos.

## Validação e erros

`mode`, `locale`, `scale`, `decimalSeparator`, `removeAccents`,
`number.gender`, `number.ordinal`, `currency.code`, as opções de formatação
monetária e todos os campos de uma moeda personalizada são validados em runtime.
A biblioteca também rejeita
opções `number` e `currency` com tipos inválidos, entrada vazia, sinal isolado,
agrupamento inválido, decimal incompleto, ordinais decimais, `NaN`, infinitos,
moedas conflitantes, valores acima da escala escolhida e strings com mais de
1000 caracteres.

## Migração da versão 2.x

A versão 3 contém mudanças incompatíveis. CommonJS passa a retornar a função
diretamente (`const extenso = require('extenso')`), o pacote requer Node.js 22.20
ou mais recente e entradas e opções inválidas deixam de usar comportamentos
permissivos. Valores monetários aceitam no máximo duas casas decimais, sem
truncamento ou arredondamento. Revise os exemplos de uso e as regras de
validação antes de atualizar.

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

Licenciado sob a licença [MIT](https://github.com/lusofonia/extenso.js/blob/master/LICENSE) © 2015-2026
