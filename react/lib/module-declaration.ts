import type { JBPaymentInputWebComponent } from 'jb-payment-input';

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
