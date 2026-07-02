import React from 'react';
import { JBPaymentInput } from 'jb-payment-input/react';
import 'jb-payment-input/bank-indicator';
import { BankIndicator } from 'jb-payment-input/bank-indicator/react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor } from 'storybook/test';
import {
  getBankImageWrapper,
  getBankIndicator,
  getMessageText,
  getNativeInput,
  getPaymentInput,
} from './test-utils';

const meta = {
  title: "Components/form elements/Inputs/JBPaymentInput",
  component: JBPaymentInput,
} satisfies Meta<typeof JBPaymentInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CardNumber: Story = {
  args: {
    label: 'card number',
    message: "please input 16 digit card number",
    value: "",
    inputType: "CARD"
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const nativeInput = getNativeInput(paymentInput);

    await userEvent.type(nativeInput, 'card 603799123456789');

    await waitFor(() => {
      expect(paymentInput.value).toBe('603799123456789');
      expect(paymentInput.reportValidity()).toBe(false);
      expect(getMessageText(paymentInput)).toBe('Please enter all 16 digits of your card number.');
      expect(paymentInput.hasState('invalid')).toBe(true);
    });

    nativeInput.focus();
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
    await userEvent.type(nativeInput, '6037991234567890');

    await waitFor(() => {
      expect(paymentInput.value).toBe('6037991234567890');
      expect(paymentInput.displayValue).toBe('6037 9912 3456 7890');
      expect(nativeInput.value).toBe('6037 9912 3456 7890');
      expect(paymentInput.reportValidity()).toBe(true);
      expect(paymentInput.hasState('invalid')).toBe(false);
    });
  }
};
export const CardNumberPaste: Story = {
  args: {
    label: 'card number paste',
    message: 'paste text that contains a 16 digit card number',
    value: '',
    inputType: 'CARD'
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const nativeInput = getNativeInput(paymentInput);

    nativeInput.value = 'card number: 6037-9912-3456-7890';
    nativeInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertFromPaste' }));

    await waitFor(() => {
      expect(paymentInput.value).toBe('6037991234567890');
      expect(paymentInput.displayValue).toBe('6037 9912 3456 7890');
      expect(nativeInput.value).toBe('6037 9912 3456 7890');
      expect(paymentInput.reportValidity()).toBe(true);
    });
  }
};
export const RequiredCardNumber: Story = {
  args: {
    label: 'card number',
    message: "please input 16 digit card number",
    inputType: "CARD",
    required:true
  }
};
export const ShabaNumber: Story = {
  args: {
    label: 'shaba number',
    message: "please input shaba number",
    value: "",
    inputType: "SHABA"
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const nativeInput = getNativeInput(paymentInput);

    await userEvent.type(nativeInput, '120000000000000000000000');

    await waitFor(() => {
      expect(paymentInput.value).toBe('IR120000000000000000000000');
      expect(paymentInput.displayValue).toBe('IR12 0000 0000 0000 0000 0000 00');
      expect(nativeInput.value).toBe('IR12 0000 0000 0000 0000 0000 00');
      expect(paymentInput.reportValidity()).toBe(true);
    });

    nativeInput.focus();
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
    await userEvent.type(nativeInput, 'IR12');

    await waitFor(() => {
      expect(paymentInput.value).toBe('IR12');
      expect(paymentInput.displayValue).toBe('IR12');
      expect(paymentInput.reportValidity()).toBe(false);
      expect(getMessageText(paymentInput)).toBe('Please enter all 26 digits of your IBAN number.');
      expect(paymentInput.hasState('invalid')).toBe(true);
    });

    nativeInput.focus();
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
    await userEvent.type(nativeInput, '12');

    await waitFor(() => {
      expect(paymentInput.value).toBe('IR12');
      expect(paymentInput.displayValue).toBe('IR12');
      expect(nativeInput.value).toBe('IR12');
    });
  }
};

export const CardNumberWithBankLogo: Story = {
  args: {
    label: 'card number',
    message: "card number with bank logo (ex: start card with 603799 number to see melli bank logo)",
    value: "",
    inputType: "CARD",
    children: <BankIndicator slot="end-section" />
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const nativeInput = getNativeInput(paymentInput);
    const bankIndicator = getBankIndicator(canvasElement);
    const bankImageWrapper = getBankImageWrapper(bankIndicator);

    await userEvent.type(nativeInput, '6037991234567890');

    await waitFor(() => {
      expect(paymentInput.value).toBe('6037991234567890');
      expect(bankIndicator.selectedBank?.title.fa).toBe('بانک ملی ایران');
      expect(bankImageWrapper.getAttribute('title')).toBe('بانک ملی ایران');
    });

    nativeInput.focus();
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
    await userEvent.type(nativeInput, '1111111234567890');

    await waitFor(() => {
      expect(bankIndicator.selectedBank).toBe(null);
    });
  }
};

export const DashSeparatorCN: Story = {
  args: {
    label: 'card number',
    message: "please input 16 digit card number",
    value: "",
    separator: "-",
    inputType: "CARD"
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const nativeInput = getNativeInput(paymentInput);

    await userEvent.type(nativeInput, '6037991234567890');

    await waitFor(() => {
      expect(paymentInput.value).toBe('6037991234567890');
      expect(paymentInput.displayValue).toBe('6037-9912-3456-7890');
      expect(nativeInput.value).toBe('6037-9912-3456-7890');
    });
  }
}
