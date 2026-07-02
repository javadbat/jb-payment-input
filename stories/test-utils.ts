import type { BankIndicatorWebComponent } from 'jb-payment-input/bank-indicator';
import type { JBPaymentInputWebComponent } from 'jb-payment-input';
import { expect } from 'storybook/test';

export function getPaymentInput(canvasElement: HTMLElement, index = 0) {
  const paymentInput = canvasElement.querySelectorAll<JBPaymentInputWebComponent>('jb-payment-input')[index];
  expect(paymentInput).toBeTruthy();
  expect(paymentInput!.shadowRoot).toBeTruthy();
  return paymentInput!;
}

export function getNativeInput(paymentInput: JBPaymentInputWebComponent) {
  const input = paymentInput.shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(input).toBeTruthy();
  return input!;
}

export function getMessageText(paymentInput: JBPaymentInputWebComponent) {
  return paymentInput.shadowRoot?.querySelector<HTMLElement>('.message-box')?.textContent ?? '';
}

export function getBankIndicator(canvasElement: HTMLElement) {
  const bankIndicator = canvasElement.querySelector<BankIndicatorWebComponent>('bank-indicator');
  expect(bankIndicator).toBeTruthy();
  expect(bankIndicator!.shadowRoot).toBeTruthy();
  return bankIndicator!;
}

export function getBankImageWrapper(bankIndicator: BankIndicatorWebComponent) {
  const wrapper = bankIndicator.shadowRoot?.querySelector<HTMLElement>('.bank-image-wrapper');
  expect(wrapper).toBeTruthy();
  return wrapper!;
}
