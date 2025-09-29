import { type ValidationItem } from "jb-validation";
import { type JBInputValue } from "jb-input";
import { dictionary } from "./i18n";
import { i18n } from "jb-core/i18n";

export const cardNumberLength:ValidationItem<JBInputValue> = {
  validator:({value})=>{
    return value.length == 16 || value.length == 0;
  },
  message:dictionary.get(i18n,"cardLengthValidation"),
  stateType:"tooShort"
}; 
export const shabaLength:ValidationItem<JBInputValue> = {
  validator:({value})=>{
    return value.length == 26 || value.length == 0;
  },
  message:dictionary.get(i18n,"IBANLengthValidation"),
  stateType:"tooShort"
}; 
export const shabaFormat:ValidationItem<JBInputValue> = {
  validator:/(?:(IR[0-9]{0,2})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,2}))?/g,
  message: dictionary.get(i18n,"IBANFullValidation"),
  stateType:"typeMismatch"
}; 