// declare global {
//     interface ElementInternals{
//         setFormValue(value:string):void;
//     }

import { JBInputWebComponent } from "jb-input";

// }
export type JBPaymentInputElements = {
    input:JBInputWebComponent
}
export type JBPaymentInputValidationResult = {
    isValid: null | boolean,
    message: null | string
}