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
- [x] Locales for every Portuguese-speaking country and Macau.
- [x] Support for BigInt for extremely large numbers.
- [x] Support for short and long number scales.
- [x] Support for grammatical gender customization.
- [x] Support for flexible formatting (comma or dot as decimal separator).
- [x] Support for abbreviated number formatting.
- [x] Support for writing percentages.
- [x] Support for writing common fractions.
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

The package also exports `BuiltInCurrencyOptions`, `CurrencyDefinition`,
`CurrencyFormattingOptions`, `CurrencyOptions`, `CurrencyRounding`,
`NumberOptions`, `ExtensoMode`, `ExtensoLocale`, `ExtensoScale`,
`ExtensoGender`, `CurrencyCode`, and `DecimalSeparator`.

The package requires Node.js 22.20 or newer.

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
- [`currency`](#optionscurrency-object) [*object*]
- [`removeAccents`](#optionsremoveaccents-boolean) [*boolean*]
- [`currency.code`](#optionscurrencycode-string) [*string*]
- [`currency.rounding`](#optionscurrencyrounding-string) [*string*]
- [`currency.showZeroUnit`](#optionscurrencyshowzerounit-boolean) [*boolean*]
- [`currency.showZeroSubunit`](#optionscurrencyshowzerosubunit-boolean) [*boolean*]
- [`currency.fractionDigits`](#optionscurrencyfractiondigits-number) [*number*]
- [`number.gender`](#optionsnumbergender-string) [*string*]
- [`number.ordinal`](#optionsnumberordinal-boolean) [*boolean*]
- [`decimalSeparator`](#optionsdecimalseparator-string) [*string*]

## `options.mode` [*string*]

> Defines the writing mode of the number.

Available options:

- `number` [*default*] - Write only the number in full.
- `currency` - Write the number as a monetary value.
- `digit` - Spell each digit individually.
- `abbreviated` - Write the number in abbreviated form.
- `fraction` - Write a fraction in `numerator/denominator` format.
- `percentage` - Write the number as a percentage.

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

extenso('1500', { mode: 'abbreviated' })
//=> '1,5 mil'

extenso('1500000', { mode: 'abbreviated' })
//=> '1,5 mi'

extenso('12.5', { mode: 'percentage' })
//=> 'doze inteiros e cinco décimos por cento'

extenso('3/4', { mode: 'fraction' })
//=> 'três quartos'
```

`fraction` mode accepts integer numerators and positive integer denominators.
The fraction is written exactly as supplied, without automatic reduction.
Denominators from 2 through 10 use their usual names; powers of ten use forms
such as `centésimo` and `milésimo`; all others use `avos`.

## `options.scale` [*string*]

> Defines the writing scale (short or long).

The short and long scales are two systems for writing numbers. The short scale is used in Brazil, while the long scale is used in the rest of the Portuguese-speaking countries.

The writing diverges for numbers equal to or greater than a thousand million
(≥10⁹) and for the corresponding decimal denominators (≤10⁻⁹). Fractions
follow the selected scale.

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

extenso('0.000000000001', { scale: 'short' })
//=> 'um trilionésimo'

extenso('0.000000000001', { scale: 'long' })
//=> 'um bilionésimo'
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

The `ao`, `br`, `cv`, `gw`, `mo`, `mz`, `pt`, and `st` locales are recognized.
Except for Brazil, they currently use non-Brazilian number forms (`dezasseis`,
`dezassete`, `dezanove`, `bilião`, and so on). More specific regional
differences will be incorporated as verifiable linguistic references become
available.

- `br` [*default*] - To write in the Brazilian dialect.
- `ao` - Angola.
- `cv` - Cape Verde.
- `gw` - Guinea-Bissau.
- `mo` - Macau.
- `mz` - Mozambique.
- `pt` - Portugal.
- `st` - São Tomé and Príncipe.

`locale` controls vocabulary, while `scale` controls the number scale. Use
`scale: 'long'` with non-Brazilian locales when you want the long scale adopted
in those countries and territories.

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

## `options.currency` [*object*]

> Configures a built-in currency or a custom currency definition.

Providing `currency`, either as a code or a custom definition, automatically
enables `currency` mode unless another `mode` is explicitly selected. An empty
object (`currency: {}`) uses the default BRL currency.

### `options.currency.code` [*string*]

> Defines the [ISO](https://en.wikipedia.org/wiki/ISO_4217) currency code in which the number should be written.

Nine currencies used in Portuguese-speaking countries and territories, or
relevant to their economic relations, are supported. The selection covers
members of the
[CPLP (Community of Portuguese Language Countries)](https://www.cplp.org/)
and Macau, where Portuguese is also an official language.

The supported currencies are:

| Code | Currency |
| --- | --- |
| `BRL` [*default*] | Brazilian Real |
| `AOA` | Angolan Kwanza |
| `CVE` | Cape Verdean Escudo |
| `XOF` | West African CFA Franc |
| `MZN` | Mozambican Metical |
| `EUR` | Euro |
| `STN` | São Tomé and Príncipe Dobra |
| `USD` | US Dollar |
| `MOP` | Macanese Pataca |

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

For a custom currency, provide the singular and plural names and the grammatical
gender (`male` or `female`) of both the unit and subunit. `code` cannot be
combined with a custom definition. Providing the definition automatically
enables `currency` mode.

### `options.currency.rounding` [*string*]

> Defines how decimal places beyond the currency precision are handled.

- `reject` [*default*] - Reject the value without changing it.
- `truncate` - Discard excess decimal places.
- `half-up` - Round to the nearest value; ties are rounded away from zero.

The calculation is exact decimal arithmetic and never converts the value to
floating point.

### `options.currency.showZeroUnit` [*boolean*]

> Writes the unit even when it is zero. The default is `false`.

### `options.currency.showZeroSubunit` [*boolean*]

> Writes the subunit even when it is zero. The default is `false`.

Enabling both options always includes the unit and subunit:

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

> Defines the number of subunit decimal places for a custom currency.

It accepts integers from 0 through 1000 and defaults to 2. Built-in currencies
keep two decimal places. This option cannot be combined with `currency.code`.

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

## `options.number.ordinal` [*boolean*]

> Defines whether the number is written as an ordinal.

This option applies to `number` mode and only accepts integer values. The
`number.gender` option also inflects every ordinal component.

- `false` [*default*] - Write the number as a cardinal.
- `true` - Write the number as an ordinal.

Examples:

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

## Currency values

In currency mode, built-in currencies accept zero, one, or two decimal places.
One place is padded with a zero on the right: `1.1` represents one unit and ten
subunits — for BRL, one real and ten cents. More places are rejected by default;
`currency.rounding` enables explicit truncation or rounding. Custom currencies
can change their precision with `currency.fractionDigits`.

The subunit of the São Tomé and Príncipe dobra (`STN`) is the cêntimo:

```js
extenso('0.01', { currency: { code: 'STN' } })
//=> 'um cêntimo'
```

Codes and symbols may appear before or after the value. Markers for different
currencies in one input are ambiguous and cause an error. `currency.code` takes
precedence over one detected currency.

In `number` mode, decimal places containing only zeros do not produce a
fraction (`1.00` is equivalent to `1`, and `-0.00` is equivalent to `0`).
`digit` mode continues to preserve every supplied digit.

## Validation and errors

`mode`, `locale`, `scale`, `decimalSeparator`, `removeAccents`,
`number.gender`, `number.ordinal`, `currency.code`, currency formatting options,
and every field in a custom currency definition are validated at runtime. The
library also rejects
`number` and `currency` options with invalid types, empty input, a bare sign,
invalid grouping, incomplete decimals, decimal ordinals, `NaN`, infinities,
conflicting currencies, values beyond the selected scale, and strings longer
than 1000 characters.

## Migrating from version 2.x

Version 3 contains breaking changes. CommonJS now returns the function directly
(`const extenso = require('extenso')`), the package requires Node.js 22.20 or
newer, and invalid inputs and options no longer receive permissive handling.
Currency values accept at most two decimal places, without truncation or
rounding. Review the usage examples and validation rules before upgrading.

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

Created and maintained by [Matheus Alves](https://github.com/theuves).

Licensed under the [MIT license](https://github.com/lusofonia/extenso.js/blob/master/LICENSE) © 2015-2026
