'use client';
import React, { useRef, useEffect, useImperativeHandle } from 'react';
import {type BaseProps, useJBInputAttribute,useJBInputEvents} from 'jb-input/react';
import 'jb-payment-input';
// eslint-disable-next-line no-duplicate-imports
import type {JBPaymentInputWebComponent, PaymentInputType} from 'jb-payment-input';
import './module-declaration.js';

// eslint-disable-next-line react/display-name
const JBPaymentInput = React.forwardRef((props:Props, ref) => {
  const element = useRef<JBPaymentInputWebComponent>(null as unknown as JBPaymentInputWebComponent);

  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );

  const {disabled,initialValue,required,validationList,value,separator,inputType, children,onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup, ...otherProps} = props;
  useJBInputAttribute(element,{disabled,required,validationList,...otherProps});
  useJBInputEvents<JBPaymentInputWebComponent>(element,{onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup,...otherProps});

  useEffect(() => {
    if (element.current) {
      element.current.paymentInputType = inputType || "CARD";
    }
  }, [inputType]);

  useEffect(() => {
    if(element.current){
      element.current.separatorString = typeof separator === "string" ? separator : " ";
    }
  }, [separator]);

  useEffect(() => {
    if (element.current && initialValue !== undefined) {
      // Payment mode and separator must be configured first; otherwise a SHABA
      // baseline would be normalized and truncated by the default CARD mode.
      element.current.initialValue = initialValue?.toString() ?? "";
    }
  }, [initialValue]);

  useEffect(() => {
    if (element.current && value !== undefined) {
      // Apply an explicit live value after initialValue so it keeps precedence.
      element.current.value = value?.toString() ?? "";
    }
  }, [value]);

  return (
    <jb-payment-input ref={element} {...otherProps}>
      {children}
    </jb-payment-input>
  );
});

export type Props = BaseProps<JBPaymentInputWebComponent> & {
  inputType?: PaymentInputType | null,
  separator?: string | null,
  initialValue?: string | number | null,
};
JBPaymentInput.displayName = "JBPaymentInput";
export {JBPaymentInput};
