import type {JBPaymentInputWebComponent} from 'jb-payment-input';
export type BankIndicatorElements = {
    bankImageWrapper: HTMLDivElement;
    PaymentInputParent:JBPaymentInputWebComponent | null;
}
type HEX = `#${string}`;
export type BankItem = {
    title:{
        fa:string,
        en:string
    },
    prefix:string[],
    logo:string,
    color:HEX,
    primary:HEX,
}
export type BankInfo = BankItem[];