import {JBDictionary} from 'jb-core/i18n';
export type JBPaymentInputDictionary = {
  cardLengthValidation:string,
  IBANLengthValidation:string,
  IBANFullValidation:string,
}

/**
 * dictionary of jb payment input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-payment-input'
 * dictionary.setLanguage("fr", {
 *  paymentValidation: "message in french",
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBPaymentInputDictionary>({
  "fa":{
    cardLengthValidation:"لطفا شماره کارت را کامل وارد کنید",
    IBANLengthValidation:"لطفا شماره شبا را کامل وارد کنید",
    IBANFullValidation:"شماره شبا وارد شده نامعتبر است"
  },
  "en":{
    cardLengthValidation:'Please enter all 16 digits of your card number.',
    IBANLengthValidation:'Please enter all 26 digits of your IBAN number.',
    IBANFullValidation:"IBAN number is invalid"
  }
});