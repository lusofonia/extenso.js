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

Ou com Yarn: `yarn add extenso`.

## Uso

```js
var extenso = require('extenso')
```

## Sintaxe

```
extenso(number[, options])
```

### `number`

**Obs.**: Parâmetro obrigatório.

- **Tipo**: `string`, `number` ou `bigint`

> O número que deverá ser escrito por extenso.

Se o valor for do tipo `number`, ele deve ser um número com parte inteira segura, ou seja, o valor deve ser válido na verificação com `Number.isSafeInteger()`. No entanto, é altamente recomendado que os números sejam encapsulados em *string* devido ao fato de que, no JavaScript, números (do tipo `number`) maiores que 9 quatrilhões perdem precisão. Alternativamente, pode-se utilizar números `BigInt` (do tipo `bigint`) adicionando `n` no final, por exemplo, `10000000000000001n` ([leia este artigo para mais informações](https://bit.ly/tableless-bigint)).

Números envolvidos em *strings* deverão seguir o formato natural de escrita de números. Você pode usar `-` no início para representar números negativos e vírgula (`,`) ou ponto (`.`) para separação de milhares e decimais, seguindo, por padrão, o formato de escrita do Brasil. Esse formato pode ser alterado conforme a preferência, utilizando o parâmetro `number.decimalSeparator`.

### `options`

**Obs.**: Parâmetro opcional.

- **Tipo**: `object`

> Configurações opcionais de escrita.

- `mode` (*string*)
- `locale` (*string*)
- `negative` (*string*)
- `scale` (* string *)
- `currency` (*object*)
- `currency.type` (*string*)
- `number` (*object*)
- `number.gender` (*string*)
- `number.decimal` (*string*)
- `number.decimalSeparator` (*string*)

#### `mode`

> Define o modo de escrita do número.

Pode ser:

- `number` (*valor padrão*) - Para escrever números simples.
- `currency` - Para escrever valores monetários.

##### Exemplo

```js
extenso('42') // 'quarenta e dois'
extenso('42', { mode: 'number' }) // 'quarenta e dois'
extenso('42', { mode: 'currency' }) // 'quarenta e dois reais'
```

#### `negative`

> Define o modo de escrita do valor negativo.

- `formal` (*valor padrão*) - Para escrever o número no modo formal.
- `informal` - Para escrever o número no modo informal.

##### Exemplo

```js
extenso('-42') // 'quarenta e dois negativo'
extenso('-42', { negative: 'formal' }) // 'quarenta e dois negativo'
extenso('-42', { negative: 'informal' }) // 'menos quarenta e dois'
```

#### `scale`

> Define a escala de escrita (curta ou longa).

As escalas curta e longa são dois sistemas de escrita dos números. A escala curta é a utilizado no Brasil, enquanto que a escala longa é a utilizada no restante dos paises de lingua portuguesa.

A escrita diverge somente em números iguais ou superiores a um milhar de milhões (`>= 10e9`), números inferiores a isso seguem com a escrita idêntica em ambas as escalas.

*Mais informações [aqui](https://pt.wikipedia.org/wiki/Escalas_curta_e_longa) [Wikipédia].*

- `short` (*valor padrão*) - Para escrever o número utilizando a escala curta.
- `long` - Para escrever o número utilizando a escala longa.

##### Exemplo

```js
extenso('2.000.000.001') // 'dois bilhões e um'
extenso('2.000.000.001', { scale: 'short' }) // 'dois bilhões e um'
extenso('2.000.000.001', { scale: 'long' }) // 'dois mil milhões e um'
```

#### `locale`

> Define a localização para o modo de escrita.

A escrita de alguns números pode váriar de país para país (e talvez até de região para região), por exemplo, o número 16 é escrito *dezesseis* no Brasil, enquanto que em Portugal é escrito *dezasseis*. A configuração dessas diferenças é feita aqui.

- `br` (*valor padrão*) - Para escrever no dialeto do Brasil.
- `pt` - Para escrever no dialeto de Portugal.

##### Exemplo

```js
extenso('16') // 'dezesseis'
extenso('16', { locale: 'br' }) // 'dezesseis'
extenso('16', { locale: 'pt' }) // 'dezasseis'
```

#### `currency.type`

> Define o código [ISO](https://pt.wikipedia.org/wiki/ISO_4217) da moeda em que o número deverá ser escrito.

- `BRL` (*valor padrão*) - Para escrever valores em Real brasileiro.
- `EUR` - Para escrever valores em Euro.
- `CVE` - Para escrever valores em Escudo cabo-verdiano.
- `MZN` - Para escrever valores em Metical moçambicano.

##### Exemplo

```js
extenso('42', { mode: 'currency' }) // 'quarenta e dois reais'
extenso('42', { mode: 'currency', currency: { type: 'BRL' } }) // 'quarenta e dois reais'
extenso('42', { mode: 'currency', currency: { type: 'EUR' } }) // 'quarenta e dois euros'
extenso('42', { mode: 'currency', currency: { type: 'CVE' } }) // 'quarenta e dois escudos'
extenso('42', { mode: 'currency', currency: { type: 'MZN' } }) // 'quarenta e dois meticais'
```

#### `number.gender`

> Define o gênero do número que será escrito.

Alguns números podem ser representados tanto no modo masculino quanto no modo feminino, por exemplo, *42* pode ser escrito como *quarenta e dois* ou *42* ou *quarenta e duas*.

- `m` (*valor padrão*) - Para escrever no modo masculino.
- `f` - Para escrever no modo feminino.

##### Exemplo

```js
extenso('42') // 'quarenta e dois'
extenso('42', { number: { gender: 'm' } }) // 'quarenta e dois'
extenso('42', { number: { gender: 'f' } }) // 'quarenta e duas'
```

#### `number.decimal`

> Define o modo de escrita do valor decimal.

- `formal` (*valor padrão*) - Para escrever no modo formal.
- `informal` - Para escrever no modo informal.

##### Exemplo

```js
extenso('3,14') // 'três inteiros e quatorze centésimos'
extenso('3,14', { number: { decimal: 'formal' } }) // 'três inteiros e quatorze centésimos'
extenso('3,14', { number: { decimal: 'informal' } }) // 'três vírgula quatorze'
```

#### `number.decimalSeparator`

> Define o separador de inteiro e decimal.

- `comma` (*valor padrão*) - Para usar **vírgula** como separador (ex. `3,14`).
- `dot` - Para usar **ponto** como separador (ex.: `3.14`)

##### Observação

Quando o separador de decimal é o `.` (ponto) automaticamente o separador de
milhar será o `,` (vírgula) e vice-versa.

##### Exemplo

```js
extenso('3,14')
extenso('3,14', { number: { decimalSeparator: 'comma' } })
extenso('3.14', { number: { decimalSeparator: 'dot' } })

// 'três inteiros e quatorze centésimos'
```

## Contribuição

Oi, você é de Portugal, Angola, Moçambique ou qualquer outro país que usa fala português? Viu alguma escrita de números que é diferente no seu país? Então abra uma *issue* e vamos discutir como adaptar essas caracteristicas ao projeto para deixá-lo o mais completo possível.

Viu algum erro ou qualquer coisa que pode ser melhorada?

Você pode, portanto:

- Abrir uma *issue*.
- Enviar um *pull request*.
- Comentar no trecho do código que você acredita que pode ser melhorado.

### Regras

Tendo em vista a participação de falantes da língua portuguesa, escreva:

- Nome de váriaveis, funções e outras coisas do tipo em **inglês**.
- Nome dos arquivos e diretórios em **inglês**.
- *Issues*, *pull requests* e comentários em **português**.
- Descrição dos testes em **português**.
  - **Regra 1**: Deve ter o formato: *Deve(m) + verbo + descrição*.
  - **Regra 2**: Nunca use ponto final na descrição.
- Mensagem de *commits* em **português**.
  - **Regra 1**: Inicie-os sempre em caixa alta.
  - **Regra 2**: Nunca use ponto final na descrição.

## *TODO*

- [ ] Traduzir o `README.md` em inglês (`README-en.md`).

## Licença

MIT &copy; Matheus Alves
