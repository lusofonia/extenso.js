declare module 'extenso' {
  /**
   * An advanced library for writing numbers in words (in Portuguese).
   * @param number The number to convert to written text
   * @param options Optional configuration for customizing the output format
   */
  export default function (
    number: string | number | bigint,
    options?: {
      mode?: 'number' | 'currency' | 'digit'
      locale?: 'pt' | 'br'
      scale?: 'short' | 'long'
      decimalSeparator?: 'comma' | 'point'
      currency?: {
        code?: 'AOA' | 'CVE' | 'BRL' | 'XOF' | 'MZN' | 'EUR' | 'STN' | 'USD' | 'MOP'
      }
      number?: {
        gender?: 'male' | 'female'
      }
    }
  ): string
}