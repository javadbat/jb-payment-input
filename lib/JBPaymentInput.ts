import HTML from "./JBPaymentInput.html";
import CSS from "./JBPaymentInput.scss";
import "jb-input";
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent } from "jb-input";
import {
  JBPaymentInputElements,
  JBPaymentInputValidationResult,
} from "./Types";

/**
 * @readonly
 * @enum {string}
 */
export enum InputTypes {
  CardNumber = "CARD_NUMBER",
  ShabaNumber = "SHABA_NUMBER",
}
export class JBPaymentInputWebComponent extends HTMLElement {
  internals_: ElementInternals | null = null;
  #disabled = false;
  static get formAssociated() {
    return true;
  }
  #value = "";
  #intentWaitingValue: string | null = null;

  elements!: JBPaymentInputElements;
  inputType?: InputTypes;
  validation: JBPaymentInputValidationResult = {
    isValid: null,
    message: null,
  };
  get value() {
    return this.#value;
  }
  set value(value) {
    const { unformattedValue, formattedValue } = this.standardValue(value);
    if (this.inputType === null) {
      this.#intentWaitingValue = value;
    }
    if (this.#value !== unformattedValue) {
      this.#value = unformattedValue;
      this.elements.input.value = formattedValue;
    }
  }
  #validationList:any[] = [];
  get validationList() {
    return this.#validationList;
  }
  set validationList(value) {
    if (Array.isArray(value)) {
      this.elements.input.validationList = value;
      this.#validationList = value;
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
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\s/g, "\\s"),
      "g"
    );
    //fix prev value display on char update
    const sVal = this.standardValue(this.value);
    this.elements.input.value = sVal.formattedValue;
  }
  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser dont support attachInternals
      this.internals_ = this.attachInternals();
    }
    this.initWebComponent();
  }
  connectedCallback() {
    // standard web component event that called when all of dom is binded
    this.callOnLoadEvent();
    this.initProp();
    this.callOnInitEvent();
  }
  callOnLoadEvent() {
    const event = new CustomEvent("load", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  callOnInitEvent() {
    const event = new CustomEvent("init", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    const html = `<style>${CSS}</style>` + "\n" + HTML;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.elements = {
      input: shadowRoot.querySelector("jb-input")! as JBInputWebComponent,
    };
    this.registerEventListener();
  }
  /**
   * @description remove separator char from given string to extract pure value
   * @param {string} rawText
   * @return {string}
   */
  #removeSeparatorString(rawText: string): string {
    return rawText.replace(this.#separatorRegex, "");
  }
  /**
   *
   * @param {string} rawText
   * @return {string}
   */
  getUnformattedValue(rawText: string): string {
    if (this.inputType == InputTypes.CardNumber) {
      let val = this.#removeSeparatorString(rawText)
        .replace(/\u06F0/g, "0")
        .replace(/\u06F1/g, "1")
        .replace(/\u06F2/g, "2")
        .replace(/\u06F3/g, "3")
        .replace(/\u06F4/g, "4")
        .replace(/\u06F5/g, "5")
        .replace(/\u06F6/g, "6")
        .replace(/\u06F7/g, "7")
        .replace(/\u06F8/g, "8")
        .replace(/\u06F9/g, "9")
        .replace(/[^0-9]/g, "");
      val = val.substring(0, 16);
      return val;
    }
    if (this.inputType == InputTypes.ShabaNumber) {
      const seprator = /(?<ir>(IR|ir|Ir|I|i)?)(?<other>.{0,})/g.exec(rawText);
      if (seprator && seprator.groups) {
        //convert perian number to en number and replace space
        let numberPart = this.#removeSeparatorString(seprator.groups.other)
          .replace(/\u06F0/g, "0")
          .replace(/\u06F1/g, "1")
          .replace(/\u06F2/g, "2")
          .replace(/\u06F3/g, "3")
          .replace(/\u06F4/g, "4")
          .replace(/\u06F5/g, "5")
          .replace(/\u06F6/g, "6")
          .replace(/\u06F7/g, "7")
          .replace(/\u06F8/g, "8")
          .replace(/\u06F9/g, "9")
          .replace(/[^0-9]/g, "");
        numberPart = numberPart.substring(0, 24);
        //manage ir part
        let irPart = "";
        if (seprator.groups.ir) {
          irPart = seprator.groups.ir.toUpperCase();
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
          return irPart;
        }

        return irPart + numberPart;
      } else {
        return "";
      }
    }
    return rawText;
  }
  /**
   * this function will get user inputed or pasted text and convert it to standard one base on developer config
   * @param {String} valueString
   * @return {{formattedValue: String, unformattedValue: String}} standard value
   */
  standardValue(valueString: string): {
    formattedValue: string;
    unformattedValue: string;
  } {
    let formattedValue = "";
    let unformattedValue = "";
    // console.log({inputType:this.inputType});
    if (this.inputType == InputTypes.CardNumber) {
      unformattedValue = this.getUnformattedValue(valueString);
      const trailingSepratorRemover = RegExp(
        `(.*)(${this.#separatorRegex.source})$`,
        "g"
      );
      formattedValue = unformattedValue
        .replace(/([0-9]{4})/g, `$1${this.#separatorString}`)
        .replace(trailingSepratorRemover, "$1");
    }
    if (this.inputType == InputTypes.ShabaNumber) {
      unformattedValue = this.getUnformattedValue(valueString);
      const matches =
        /(IR[0-9]{0,2})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,2})/g.exec(
          unformattedValue
        );
      if (matches && matches.length > 0) {
        formattedValue = matches
          .slice(1)
          .filter((x) => x !== "")
          .join(this.#separatorString);
      } else {
        formattedValue = unformattedValue;
      }
    }
    return { unformattedValue, formattedValue };
  }
  registerEventListener() {
    this.elements.input.addEventListener("change", (e:Event) =>
      this.onInputChange(e)
    );
    this.elements.input.addEventListener("keypress", (e:KeyboardEvent) =>
      this.onInputKeyPress(e)
    );
    this.elements.input.addEventListener("keyup", (e:KeyboardEvent) => this.onInputKeyup(e));
    this.elements.input.addEventListener("keydown", (e:KeyboardEvent) =>
      this.onInputKeyDown(e)
    );
    this.elements.input.addEventListener("input", (e:InputEvent) =>
      this.onInputInput(e as unknown as InputEvent)
    );
    this.elements.input.addEventListener("beforeinput", (e:InputEvent) =>
      this.onInputBeforeInput(e)
    );
  }
  initProp() {
    this.#disabled = false;
    this.inputType = this.getAttribute("input-type") as InputTypes;
    this.value = this.getAttribute("value") || "";
  }
  static get observedAttributes() {
    return [
      "label",
      "input-type",
      "message",
      "value",
      "name",
      "autocomplete",
      "placeholder",
      "disabled",
      "inputmode",
      "separator",
    ];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string) {
    switch (name) {
      case "label":
        this.elements.input.setAttribute("label", value);
        break;
      case "input-type":
        if (Object.values(InputTypes).includes(value as InputTypes)) {
          this.inputType = value as InputTypes;
          if (this.#intentWaitingValue !== null) {
            this.value = this.#intentWaitingValue;
            this.#intentWaitingValue = null;
          }
        }
        //shaba or card number
        break;
      case "message":
        this.elements.input.setAttribute("message", value);
        break;
      case "value":
        this.value = value;
        break;
      case "name":
        this.elements.input.setAttribute("name", value);
        break;
      case "autocomplete":
        this.elements.input.setAttribute("autocomplete", value);
        break;
      case "placeholder":
        this.elements.input.setAttribute("placeholder", value);
        break;
      case "disabled":
        if (value === "" || value === "true") {
          this.#disabled = true;
          this.elements.input.setAttribute("disabled", "true");
        } else if (
          value == "false" ||
          value === "undefined" ||
          value === "null"
        ) {
          this.#disabled = false;
          this.elements.input.removeAttribute("disabled");
        }
        break;
      case "inputmode":
        this.elements.input.setAttribute("inputmode", value);
        break;
      case "separator":
        this.separatorString = value;
        break;
    }
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  onInputKeyDown(e: KeyboardEvent) {
    //trigger componnet event
    const keyDownnInitObj = {
      key: e.key,
      keyCode: e.keyCode,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      charCode: e.charCode,
      which: e.which,
    };
    const event = new KeyboardEvent("keydown", keyDownnInitObj);
    this.dispatchEvent(event);
  }
  /**
   *
   * @param {InputEvent} e
   */
  onInputInput(e: InputEvent) {
    const inputedText = (e.target as JBInputWebComponent).value;
    const sVal = this.standardValue(inputedText);
    this.#value = sVal.unformattedValue;
    this.elements.input.value = sVal.formattedValue;
    this.dispatchInputEvent(e);
  }
  dispatchInputEvent(e:InputEvent) {
    const eventInitDict = {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      composed: e.composed,
      data: e.data,
      isComposing: e.isComposing,
      inputType: e.inputType,
      dataTransfer: e.dataTransfer,
      view: e.view,
      detail: e.detail
    };
    const event = new InputEvent("input", eventInitDict);
    this.dispatchEvent(event);
  }
  /**
   *
   * @param {InputEvent} e
   */
  onInputBeforeInput(e: InputEvent) {
    //const inputedText = e.data;
    this.dispatchBeforeInputEvent(e);
  }
  dispatchBeforeInputEvent(e:InputEvent) {
    const eventInitDict = {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      composed: e.composed,
      data: e.data,
      isComposing: e.isComposing,
      inputType: e.inputType,
      dataTransfer: e.dataTransfer,
      view: e.view,
      detail: e.detail,
    };
    const event = new InputEvent("beforeinput", eventInitDict);
    this.dispatchEvent(event);
  }
  onInputKeyPress(e: KeyboardEvent) {
    //TODO: raise keypress event
    const event = new CustomEvent("keypress");
    this.dispatchEvent(event);
  }
  onInputKeyup(e:KeyboardEvent) {
    this.triggerInputValidation(false);
    const keyUpInitObj = {
      key: e.key,
      keyCode: e.keyCode,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      charCode: e.charCode,
      which: e.which,
    };
    const event = new KeyboardEvent("keyup", keyUpInitObj);
    this.dispatchEvent(event);
    if (e.keyCode == 13) {
      this.onInputEnter();
    }
  }
  onInputEnter() {
    const event = new CustomEvent("enter");
    this.dispatchEvent(event);
  }
  onInputChange(e:Event) {
    this.triggerInputValidation(true);
    //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
    this.dispatchOnChangeEvent();
  }
  dispatchOnChangeEvent() {
    const validationObject = this.elements.input.checkInputValidation(
      this.value
    );
    const event = new CustomEvent("change", {
      detail: {
        isValid: validationObject.isAllValid,
        validationObject: validationObject,
      },
    });
    this.dispatchEvent(event);
  }
  triggerInputValidation(showError = true) {
    return this.elements.input.checkValidity(showError);
  }
  /**
   * @public
   */
  focus() {
    //public method
    this.elements.input.focus();
  }
}
const myElementNotExists = !customElements.get("jb-payment-input");
if (myElementNotExists) {
  window.customElements.define("jb-payment-input", JBPaymentInputWebComponent);
}
