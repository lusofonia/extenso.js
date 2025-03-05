<div align="center">

[_If you don't speak English, check out the Portuguese version of this README here._](https://github.com/lusofonia/extenso.js/blob/master/README.md)

[_If you want a private consultation, contact me here._](https://esyyuh0nxyf.typeform.com/to/fG1XDrpT)

</div>

***

<div align="center">
  <h1>Extenso.js</h1>
  An advanced library for writing numbers in full (in Portuguese).
  <br />
  <br />

  [![Tests](https://github.com/lusofonia/extenso.js/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/ci-tests.yml)
  [![CodeQL](https://github.com/lusofonia/extenso.js/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/github-code-scanning/codeql)
  [![Dependabot Updates](https://github.com/lusofonia/extenso.js/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/lusofonia/extenso.js/actions/workflows/dependabot/dependabot-updates)
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lusofonia_extenso.js&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lusofonia_extenso.js)

  [![Donate Pix (Brazil)](https://img.shields.io/badge/Donate-Pix%20(Brasil)-blue.svg)](https://nubank.com.br/cobrar/193y02/67a7cf95-b24c-4a98-95b2-9ce5daf03e2c)
  [![Donate GitHub Sponsors](https://img.shields.io/badge/Donate-GitHub%20Sponsors-blue.svg)](https://github.com/sponsors/theuves)
  [![Donate PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?hosted_button_id=3TPLED2TF5874)
</div>

***

The Extenso.js project was created to provide a simple and efficient solution for converting numbers to text in Portuguese.

The motivation behind this project is to meet a common need in various financial, educational, and administrative applications, where it is often necessary to convert numerical values into words for documentation, checks, invoices, and other formal documents.

Our ambition with Extenso.js is to make this library a reference for developers who need this functionality in their applications, promoting the standardization and simplification of the process of converting numbers to text.

## Features

- [x] Support for numbers up to duodecillion (10³⁹ or 10⁷²).
- [x] Support for negative and decimal numbers.
- [x] Support for multiple currencies (BRL, EUR, USD, and more).
- [x] Support for different Portuguese dialects (Brazil and Portugal).
- [x] Support for BigInt for extremely large numbers.
- [x] Support for short and long number scales.
- [x] Support for grammatical gender customization.
- [x] Support for flexible formatting (comma or dot as decimal separator).
- [x] Zero dependencies.

_**NOTE**: Note that 10³⁹ is the limit for the short scale while 10⁷² is the limit for the long scale._

## Installation

```bash
npm install extenso
```

Or if you prefer, with Yarn:

```bash
yarn add extenso
```

## Usage

```js
import extenso from 'extenso'
```

## Syntax

```
extenso(number[, options])
```

## `number` [*string*, *number*, *bigint*]

> The value to be written in full (mandatory).

If the value is of type `number`, it is recommended that it be a number with a safe integer part, that is, the value must be valid in the verification with `Number.isSafeInteger()`, otherwise, it is recommended that the numbers be encapsulated in *string* due to the fact that, in JavaScript, numbers (of type `number`) greater than 9 quadrillion lose precision. Alternatively, you can use `BigInt` numbers (of type `bigint`) by adding `n` at the end, for example, `10000000000000001n` ([read this article for more information](https://bit.ly/tableless-bigint)), however, you will be limited to integers only, not being able to represent decimal numbers.

Numbers involved in *strings* should follow the natural format of writing numbers. You can use `-` at the beginning to represent negative numbers and comma (`,`) or dot (`.`) for thousands and decimal separation, following, by default, the Brazilian writing format (i.e., with comma as decimal separator). This format can be changed as preferred, using the `number.decimalSeparator` parameter as will be seen later.

## `options` [*object*]

> Writing options (optional).

- [`mode`](#optionsmode-string) [*string*]
- [`scale`](#optionsscale-string) [*string*]
- [`locale`](#optionslocale-string) [*string*]
- [`currency.code`](#optionscurrencycode-string) [*string*]
- [`number.gender`](#optionsnumbergender-string) [*string*]
- [`number.decimalSeparator`](#optionsnumberdecimalsseparator-string) [*string*]

## `options.mode` [*string*]

> Defines the writing mode of the number.

Available options:

- `number` [*default*] - Write only the number in full.
- `currency` - Write the number as a monetary value.
- `digit` - Write the number in full in digits.

Examples:

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

> Defines the writing scale (short or long).

The short and long scales are two systems for writing numbers. The short scale is used in Brazil, while the long scale is used in the rest of the Portuguese-speaking countries.

The writing diverges only in numbers equal to or greater than a thousand million (≥10⁹), numbers below that follow with identical writing in both scales.

*More information [here](https://pt.wikipedia.org/wiki/Escalas_curta_e_longa) [Wikipedia].*

- `short` [*default*] - To write the number using the short scale.
- `long` - To write the number using the long scale.

Examples:

```js
extenso('2.000.000.001')
//=> 'dois bilhões e um'

extenso('2.000.000.001', { scale: 'short' })
//=> 'dois bilhões e um'

extenso('2.000.000.001', { scale: 'long' })
//=> 'dois mil milhões e um'
```

## `options.decimalSeparator` [*string*]

> Defines the integer and decimal separator.

In Portuguese, the most common integer and decimal separator is the comma (`comma`). However, in other countries, it may be necessary to use the dot (`point`) as a decimal separator. In this case, you can use the `number.decimalSeparator` parameter to define another decimal separator (`point`), however, this is only necessary if the provided number is encapsulated in *string*.

Note that if the decimal separator is `point` (.) then the thousand separator will automatically be `comma` (,) and vice versa.

- `comma` [*default*] - To use **comma** as separator (e.g., `3,14`).
- `point` - To use **dot** as separator (e.g., `3.14`)

Examples:

```js
extenso('3,14')
//=> 'três inteiros e quatorze centésimos'

extenso('3,14', { number: { decimalSeparator: 'comma' } })
//=> 'três inteiros e quatorze centésimos'

extenso('3.14', { number: { decimalSeparator: 'point' } })
//=> 'três inteiros e quatorze centésimos'
```

## `options.locale` [*string*]

> Defines the location (dialect) for writing.

The writing of some numbers may vary from country to country (and perhaps even from region to region); for example, the number 16 is written *dezesseis* in Brazil, while in Portugal it is written *dezasseis*. The configuration of these differences is done here.

So far, the dialects `br` and `pt` are supported according to the known differences between Brazilian Portuguese and European Portuguese. If you need a different dialect, open an [*issue*](https://github.com/lusofonia/extenso.js/issues) and let's discuss how to adapt these characteristics to the project to make it as complete as possible.

- `br` [*default*] - To write in the Brazilian dialect.
- `pt` - To write in the Portuguese dialect.

Examples:

```js
extenso('16')
//=> 'dezesseis'

extenso('16', { locale: 'br' })
//=> 'dezesseis'

extenso('16', { locale: 'pt' })
//=> 'dezasseis'

extenso('1.000.000.000', { locale: 'br' })
//=> 'um bilhão'

extenso('1.000.000.000', { locale: 'pt' })
//=> 'um bilião'
```

## `options.currency.code` [*string*]

> Defines the [ISO](https://pt.wikipedia.org/wiki/ISO_4217) currency code in which the number should be written.

So far, only 10 currencies are supported, chosen based on the economic and commercial importance of each and which are the most used in the member countries of the [CPLP (Community of Portuguese Language Countries)](https://www.cplp.org/), which are: Brazil, Angola, Cape Verde, Guinea-Bissau, Equatorial Guinea, Mozambique, Portugal, São Tomé and Príncipe, and Timor-Leste.

_Custom currency definition will be supported soon. You can contribute by sending a [*pull request*](https://github.com/lusofonia/extenso.js/pulls) with the addition of a new currency or with the correction of an error in an existing currency._

The supported currencies are:

- `BRL` [*default*] - Brazilian Real
- `AOA` - Angolan Kwanza
- `CVE` - Cape Verdean Escudo
- `XOF` - West African CFA Franc
- `MZN` - Mozambican Metical
- `EUR` - Euro
- `STN` - São Tomé and Príncipe Dobra
- `USD` - US Dollar
- `MOP` - Macanese Pataca

Examples:

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

> Defines the gender inflection of the number to be written.

Currently, in the Portuguese language [only the numbers 1 and 2 can be written in both masculine and feminine modes](https://pt.wikipedia.org/wiki/Dual), for example, *1* can be written as *um* or *uma* and *2* can be written as *dois* or *duas*. If you need the number to be written in the feminine gender, you can use `female` to define it.

- `male` [*default*] - To write in the masculine mode.
- `female` - To write in the feminine mode.

Examples:

```js
extenso('42')
//=> 'quarenta e dois'

extenso('42', { number: { gender: 'male' } })
//=> 'quarenta e dois'

extenso('42', { number: { gender: 'female' } })
//=> 'quarenta e duas'
```

## Default Language

The default language of Extenso.js is Brazilian Portuguese. This choice is due to several factors:

1. **Project Origin**: Extenso.js was created in Brazil, where the need to convert numbers to text in Portuguese is quite common in various applications.
2. **Speaking Population**: Brazil has the largest population of Portuguese speakers in the world, making Brazilian Portuguese the most widely used variant of the language.
3. **Currency Used**: Although the Euro is an important global currency, the Real (BRL) is the most used currency by Portuguese speakers, especially in Brazil.
4. **Decimal Separator**: The comma is used as a decimal separator in most Portuguese-speaking countries, including Brazil, which justifies its adoption as the default in Extenso.js.

These factors contribute to Brazilian Portuguese being the default language of Extenso.js, ensuring that the library meets the needs of most of its users.

## Contributions

Are you from Portugal, Angola, Mozambique, or any other country where Portuguese is spoken? Did you notice any difference in how numbers are written in your country? If you have identified variations, open an issue to discuss how to adapt these characteristics to the project and make it more complete.

If you found any errors or something that can be improved, there are different ways to contribute:

- Opening an issue to report suggestions or problems.
- Sending a pull request with improvements.
- Commenting directly on the code snippet that can be improved.

Every contribution is welcome.

## License

MIT &copy; Matheus Alves
