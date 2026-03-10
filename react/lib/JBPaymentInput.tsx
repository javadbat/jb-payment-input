'use client';
import React, { useRef, useEffect, useImperativeHandle } from 'react';
import {type BaseProps, useJBInputAttribute,useJBInputEvents} from 'jb-input/react';
import 'jb-payment-input';
// eslint-disable-next-line no-duplicate-imports
import type {JBPaymentInputWebComponent, PaymentInputType} from 'jb-payment-input';

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-payment-input': JBPaymentInputType;
    }
     interface JBPaymentInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBPaymentInputWebComponent>, JBPaymentInputWebComponent> {
      "class"?: string,
      "type"?: string,
      "label"?:string,
      "message"?:string,
      "placeholder"?:string,
    }
  }
}
// eslint-disable-next-line react/display-name
const JBPaymentInput = React.forwardRef((props:Props, ref) => {
  const element = useRef<JBPaymentInputWebComponent>(null);

  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );

  const {disabled,required,validationList,value,separator,inputType, children,onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup, ...otherProps} = props;
  useJBInputAttribute(element,{disabled,required,validationList,value,...otherProps});
  useJBInputEvents<JBPaymentInputWebComponent>(element,{onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup,...otherProps});

  useEffect(() => {
    element.current.setAttribute('input-type', inputType);
  }, [inputType]);

  useEffect(() => {
    if( separator && typeof separator === "string" && separator !== ""){
      element.current.separatorString = separator;
    }
  }, [separator]);

  return (
    <jb-payment-input  ref={element} {...otherProps}>
      {children}
    </jb-payment-input>
  );
});

export type Props = BaseProps<JBPaymentInputWebComponent> & {
  inputType?: PaymentInputType | null,
  separator?: string | null,
};
JBPaymentInput.displayName = "JBPaymentInput";
export {JBPaymentInput};