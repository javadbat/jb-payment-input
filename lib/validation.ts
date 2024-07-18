import { type ValidationItem } from "jb-input";
import { type JBInputValue } from "jb-input/types";

export const cardNumberLength:ValidationItem<JBInputValue> = {
  validator:({value})=>{
    return value.length == 16;
  },
  message:"لطفا شماره کارت را کامل وارد کنید"
}; 
export const shabaLength:ValidationItem<JBInputValue> = {
  validator:({value})=>{
    return value.length == 26;
  },
  message:"لطفا شماره شبا را کامل وارد کنید"
}; 
export const shabaFormat:ValidationItem<JBInputValue> = {
  validator:/(IR[0-9]{0,2})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,2})/g,
  message:"لطفا شماره شبا را صحیح وارد کنید"
}; 