import type { BankIndicatorWebComponent } from 'jb-payment-input/bank-indicator';

declare module "react" {
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
