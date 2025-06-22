'use client';
import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import {BaseProps, useJBInputAttribute,useJBInputEvents} from 'jb-input/react';
import 'jb-payment-input';
// eslint-disable-next-line no-duplicate-imports
import {JBPaymentInputWebComponent, PaymentInputType} from 'jb-payment-input';

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


  useJBInputAttribute(element,props);
  useJBInputEvents<JBPaymentInputWebComponent>(element,props);

  useEffect(() => {
    element.current.setAttribute('input-type', props.inputType);
  }, [props.inputType]);

  useEffect(() => {
    if( props.separator && typeof props.separator === "string" && props.separator !== ""){
      element.current.separatorString = props.separator;
    }
  }, [props.separator]);

  return (
    <jb-payment-input placeholder={props.placeholder?props.placeholder:''} ref={element} class={props.className?props.className:''} label={props.label?props.label:''} message={props.message?props.message:''}>
      {props.children}
    </jb-payment-input>
  );
});

export type Props = BaseProps<JBPaymentInputWebComponent> & {
  inputType?: PaymentInputType | null,
  separator?: string | null,
};
JBPaymentInput.displayName = "JBPaymentInput";
export {JBPaymentInput};