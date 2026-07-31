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
- [x] Support for writing without accents.
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

The package also exports `CurrencyOptions`, `NumberOptions`, `ExtensoMode`, `ExtensoLocale`, `ExtensoScale`, `ExtensoGender`, `CurrencyCode`, and `DecimalSeparator`.

The package requires Node.js 18 or newer.

## Syntax

```
extenso(number[, options])
```

## `number` [*string*, *number*, *bigint*]

> The value to be written in full (mandatory).

Finite `number` inputs are accepted, including values JavaScript represents in scientific notation, and are normalized before conversion. The value must already be representable with the desired `number` precision: use a `string` or `bigint` for integers above `Number.MAX_SAFE_INTEGER`. A `bigint` can only represent integers.

Strings preserve every supplied digit. The `-` sign is only valid at the beginning. When grouping is used, the first group must contain one to three digits and every following group exactly three. A decimal separator must be followed by digits; incomplete inputs such as `1.` are rejected.

## `options` [*object*]

> Writing options (optional).

- [`mode`](#optionsmode-string) [*string*]
- [`scale`](#optionsscale-string) [*string*]
- [`locale`](#optionslocale-string) [*string*]
- [`removeAccents`](#optionsremoveaccents-boolean) [*boolean*]
- [`currency.code`](#optionscurrencycode-string) [*string*]
- [`number.gender`](#optionsnumbergender-string) [*string*]
- [`decimalSeparator`](#optionsdecimalseparator-string) [*string*]

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
extenso('2,000,000,001')
//=> 'dois bilhões e um'

extenso('2,000,000,001', { scale: 'short' })
//=> 'dois bilhões e um'

extenso('2,000,000,001', { scale: 'long' })
//=> 'dois mil milhões e um'
```

## `options.decimalSeparator` [*string*]

> Defines the integer and decimal separator.

By default, the point is the decimal separator (`point`) and the comma is the thousands separator. Use `comma` to reverse that interpretation. This option matters primarily for strings because `number` inputs are normalized from JavaScript's representation.

Note that if the decimal separator is `point` (.) then the thousand separator will automatically be `comma` (,) and vice versa.

- `point` [*default*] - To use **dot** as separator (e.g., `3.14`).
- `comma` - To use **comma** as separator (e.g., `3,14`).

Examples:

```js
extenso('3.14')
//=> 'três inteiros e quatorze centésimos'

extenso('3,14', { decimalSeparator: 'comma' })
//=> 'três inteiros e quatorze centésimos'

extenso('3.14', { decimalSeparator: 'point' })
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

extenso('1,000,000,000', { locale: 'br' })
//=> 'um bilhão'

extenso('1,000,000,000', { locale: 'pt' })
//=> 'um bilião'
```

## `options.removeAccents` [*boolean*]

> Removes accents and other diacritical marks from the returned text.

- `false` [*default*] - Preserves normal accentuation.
- `true` - Returns the number in words without accents.

This option works in every writing mode and can be combined with any locale.

Examples:

```js
extenso('123')
//=> 'cento e vinte e três'

extenso('123', { removeAccents: true })
//=> 'cento e vinte e tres'

extenso('3.14', { removeAccents: true })
//=> 'tres inteiros e quatorze centesimos'
```

## `options.currency.code` [*string*]

> Defines the [ISO](https://pt.wikipedia.org/wiki/ISO_4217) currency code in which the number should be written.

So far, only 9 currencies are supported, chosen based on the economic and commercial importance of each and which are the most used in the member countries of the [CPLP (Community of Portuguese Language Countries)](https://www.cplp.org/), which are: Brazil, Angola, Cape Verde, Guinea-Bissau, Equatorial Guinea, Mozambique, Portugal, São Tomé and Príncipe, and Timor-Leste.

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

Female gender inflects units, tens, and hundreds (`uma`, `duas`, `duzentas`, `trezentas`, and so on), including the thousands group. Scale names such as `milhão` and `bilhão` remain masculine.

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

extenso('322000', { number: { gender: 'female' } })
//=> 'trezentas e vinte e duas mil'
```

## Currency values

Currency mode accepts zero, one, or two decimal places. One place is padded with a zero on the right (`1.1` means ten cents). More than two places are rejected without truncation or rounding. Codes and symbols may appear before or after the value; markers for different currencies in one input are ambiguous and cause an error. `currency.code` takes precedence over one detected currency.

## Validation and errors

`mode`, `locale`, `scale`, `decimalSeparator`, `removeAccents`, `number.gender`, and `currency.code` are validated at runtime. The library also rejects empty input, a bare sign, invalid grouping, incomplete decimals, `NaN`, infinities, conflicting currencies, values beyond the selected scale, and strings longer than 1000 characters.

## Migrating to the next version

This preparation includes breaking changes: CommonJS now returns the function directly; numeric formats that were previously tolerated may throw; currency no longer accepts more than two decimal places; and unknown options no longer silently fall back to defaults. The next version has not been published, and its number will be decided by the maintainer.

## Default Language

The default language of Extenso.js is Brazilian Portuguese. This choice is due to several factors:

1. **Project Origin**: Extenso.js was created in Brazil, where the need to convert numbers to text in Portuguese is quite common in various applications.
2. **Speaking Population**: Brazil has the largest population of Portuguese speakers in the world, making Brazilian Portuguese the most widely used variant of the language.
3. **Currency Used**: Although the Euro is an important global currency, the Real (BRL) is the most used currency by Portuguese speakers, especially in Brazil.
4. **Decimal Separator**: The `decimalSeparator` option explicitly selects point or comma without changing the output dialect.

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
