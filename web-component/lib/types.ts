import type { PaymentInputTypeList } from "./constants";
import type {JBPaymentInputWebComponent} from './jb-payment-input.js';
import type {EventTypeWithTarget} from 'jb-core';

export type PaymentInputType = typeof PaymentInputTypeList[number];
export type JBPaymentInputEventType<TEvent> = EventTypeWithTarget<TEvent,JBPaymentInputWebComponent>;