import CSS from "./jb-payment-input.css";
import "jb-input";
import { type PaymentInputType } from './types';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent, type JBInputValue } from "jb-input";
import { type ValidationItem } from "jb-validation";
import { faToEnDigits } from "jb-core";
import { cardNumberLength, shabaFormat, shabaLength } from "./validation.js";
import { PaymentInputTypeList } from "./constants.js";
export * from './types.js';
export * from './constants.js';
//TODO: add barcode scanner or nfc reader
export class JBPaymentInputWebComponent extends JBInputWebComponent {
  #paymentInputType: PaymentInputType = this.getAttribute("input-type") as PaymentInputType || "CARD";
  get paymentInputType() {
    return this.#paymentInputType;
  }
  set paymentInputType(value: PaymentInputType) {
    if(PaymentInputTypeList.includes(value)){
      this.#paymentInputType = value || "CARD";
    }
  }
  #separatorString = " ";
  //calculated on separatorString set
  #separatorRegex = /\s/g;
  get separatorString() {
    return this.#separatorString;
  }
  set separatorString(value: string) {
    this.#separatorString = value;
    this.#separatorRegex = RegExp(
      this.#separatorString
        //will replace every regex meaningful char with \\ prefix to disable its meaningful functions
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\s/g, "\\s"),
      "g");
    //fix prev value display on char update
    const sVal = this.standardValue(this.value,"SET_VALUE");
    this.elements.input.value = sVal.displayValue;
  }
  constructor() {
    super();
    //to prevent initWebComponent  method override
    this.#initPaymentInputWebComponent();
  }
  #initPaymentInputWebComponent() {
    const html = `<style>${CSS}</style>`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot.appendChild(element.content.cloneNode(true));
    this.validation.addValidationListGetter(this.#getPaymentInputValidations.bind(this));
    this.#addPaymentInputEventListeners();
    this.addStandardValueCallback(this.#standardPaymentValue.bind(this));
  }
  static get observedAttributes() {
    return [
      ...JBInputWebComponent.observedAttributes,
      "input-type",
      "separator",
    ];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    // call base jb-input on attribute changes
    if (["input-type", "separator"].includes(name)) {
      this.#onPaymentAttributeChange(name, newValue);
    } else {
      this.onAttributeChange(name, newValue);
    }
  }
  #onPaymentAttributeChange(name: string, value: string) {
    switch (name) {
      case 'input-type':
        this.paymentInputType = value as PaymentInputType;
        break;
      case 'separator':
        this.separatorString = value;
        break;
    }
  }
  #getPaymentValueString(rawText: string): string {
    if (this.#paymentInputType == "CARD") {
      let val = faToEnDigits(this.#removeSeparatorString(rawText)).replace(/[^0-9]/g, "");
      val = val.substring(0, 16);
      return val;
    }
    if (this.#paymentInputType == "SHABA") {
      const separator = /(?<ir>(IR|ir|Ir|I|i)?)(?<other>.{0,})/g.exec(rawText);
      if (separator && separator.groups) {
        //convert perian number to en number and replace space
        let numberPart = faToEnDigits(this.#removeSeparatorString(separator.groups.other)).replace(/[^0-9]/g, "");
        numberPart = numberPart.substring(0, 24);
        //manage ir part
        let irPart = "";
        if (separator.groups.ir) {
          irPart = separator.groups.ir.toUpperCase();
        } else {
          // if user input some number without ir part we add it ourselves
          if (numberPart.length > 0) {
            irPart = "IR";
          } else {
            //if user input no ir part and no valid number part we return empty string
            return "";
          }
        }
        if (irPart.length == 1) {
          if (numberPart.length > 0) {
            irPart = "IR";
          } else {
            return irPart;
          }
        }
        return irPart + numberPart;
      } else {
        return "";
      }
    }
    return rawText;
  }

  /**
 * @description remove separator char from given string to extract pure value
 */
  #removeSeparatorString(rawText: string): string {
    return rawText.replace(this.#separatorRegex, "");
  }
  /**
   * @description this function will get user inputted or pasted text and convert it to standard one base on developer config
   */
  #standardPaymentValue(valueString: string): JBInputValue {
    let displayValue = "";
    let value = "";
    if (this.#paymentInputType == "CARD") {
      value = this.#getPaymentValueString(valueString);
      const trailingSeparatorRemover = RegExp(
        `(.*)(${this.#separatorRegex.source})$`,
        "g"
      );
      displayValue = value
        .replace(/([0-9]{4})/g, `$1${this.#separatorString}`)
        .replace(trailingSeparatorRemover, "$1");
    }
    if (this.#paymentInputType == "SHABA") {
      value = this.#getPaymentValueString(valueString);
      const matches =
        /(IR[0-9]{0,2})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,2})/g.exec(
          value
        );
      if (matches && matches.length > 0) {
        displayValue = matches
          .slice(1)
          .filter((x) => x !== "")
          .join(this.#separatorString);
      } else {
        displayValue = value;
      }
    }
    return { value, displayValue };
  }
  #addPaymentInputEventListeners() {
    //TODO: add before input to prevent non number, space, IR chars
  }
  #getPaymentInputValidations(): ValidationItem<JBInputValue>[] {
    if (this.#paymentInputType == "CARD") {
      return [cardNumberLength];
    }
    return [shabaLength, shabaFormat];
  }
}

const myElementNotExists = !customElements.get("jb-payment-input");
if (myElementNotExists) {
  window.customElements.define("jb-payment-input", JBPaymentInputWebComponent);
}