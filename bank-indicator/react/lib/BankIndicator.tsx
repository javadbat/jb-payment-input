import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import 'jb-payment-input/bank-indicator';
//@ts-ignore
// eslint-disable-next-line no-duplicate-imports
import type {BankIndicatorWebComponent} from 'jb-payment-input/bank-indicator';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'bank-indicator': BankIndicatorType;
    }
    interface BankIndicatorType extends React.DetailedHTMLProps<React.HTMLAttributes<BankIndicatorWebComponent>, BankIndicatorWebComponent> {
      "class"?: string,
    }
  }
}
// eslint-disable-next-line react/display-name
const BankIndicator = React.forwardRef((props:Props, ref) => {
  const element = useRef<BankIndicatorWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  useEffect(() => {
    if( props.prefix && typeof props.prefix === "string" && props.prefix !== ""){
      element.current?.setAttribute('prefix', props.prefix);
    }
  }, [props.prefix]);
  return (
    <bank-indicator ref={element} class={props.className?props.className:''} slot={props.slot} />
  );
});

export type Props = {
  className?:string,
  slot?:string,
  prefix?:string
};
BankIndicator.displayName = "BankIndicator";
export {BankIndicator};