'use client';
import React, { useRef, useEffect, useImperativeHandle } from 'react';
import 'jb-payment-input/bank-indicator';
import type { JBElementStandardProps } from "jb-core/react"
import type { BankIndicatorWebComponent } from 'jb-payment-input/bank-indicator';
import './module-declaration.js';
// eslint-disable-next-line react/display-name
const BankIndicator = React.forwardRef((props: Props, ref) => {
  const element = useRef<BankIndicatorWebComponent>(null);

  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  const { prefix, children, ...otherProps } = props
  useEffect(() => {
    if (prefix && typeof prefix === "string" && prefix !== "") {
      element.current?.setAttribute('prefix', prefix);
    } else {
      element.current?.removeAttribute('prefix');
    }
  }, [prefix]);
  return (
    <bank-indicator ref={element} {...otherProps} />
  );
});

type BankIndicatorProps = {
  prefix?: string
};
export type Props = BankIndicatorProps & JBElementStandardProps<BankIndicatorWebComponent, keyof BankIndicatorProps>
BankIndicator.displayName = "BankIndicator";
export { BankIndicator };
