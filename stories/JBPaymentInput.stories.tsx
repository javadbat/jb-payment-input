import { useRef } from 'react';
import { JBButton } from 'jb-button/react';
import { JBPaymentInput } from 'jb-payment-input/react';
import 'jb-payment-input/bank-indicator';
import { BankIndicator } from 'jb-payment-input/bank-indicator/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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

const initialShaba = 'IR120000000000000000000000';
const nextInitialShaba = 'IR340000000000000000000000';

export const InitialValue: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBPaymentInput {...args} />
        <JBButton type="button" onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial SHABA',
    inputType: 'SHABA',
    initialValue: initialShaba,
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      // The wrapper must configure SHABA mode before assigning the baseline,
      // otherwise CARD normalization truncates the 24-digit account number.
      expect(paymentInput.initialValue).toBe(initialShaba);
      expect(paymentInput.value).toBe(initialShaba);
      expect(paymentInput.displayValue).toBe('IR12 0000 0000 0000 0000 0000 00');
      expect(paymentInput.isDirty).toBe(false);
    });

    paymentInput.initialValue = nextInitialShaba;

    await waitFor(() => {
      expect(paymentInput.initialValue).toBe(nextInitialShaba);
      expect(paymentInput.value).toBe(nextInitialShaba);
      expect(paymentInput.isDirty).toBe(false);
    });

    paymentInput.value = 'IR560000000000000000000000';
    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(paymentInput.value).toBe(nextInitialShaba);
      expect(paymentInput.isDirty).toBe(false);
    });
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    inputType: 'SHABA',
    initialValue: initialShaba,
    value: nextInitialShaba,
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);

    await waitFor(() => {
      expect(paymentInput.initialValue).toBe(initialShaba);
      expect(paymentInput.value).toBe(nextInitialShaba);
      expect(paymentInput.isDirty).toBe(true);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    inputType: 'SHABA',
    initialValue: initialShaba,
    value: null,
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);

    await waitFor(() => {
      expect(paymentInput.initialValue).toBe(initialShaba);
      expect(paymentInput.value).toBe('');
      expect(paymentInput.isDirty).toBe(true);
    });
  },
};

export const ChangingPaymentTypeKeepsInitialBaseline: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBPaymentInput {...args} />
        <JBButton type="button" onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    inputType: 'CARD',
    initialValue: '6037991234567890',
  },
  play: async ({ canvasElement }) => {
    const paymentInput = getPaymentInput(canvasElement);
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      expect(paymentInput.value).toBe('6037991234567890');
      expect(paymentInput.isDirty).toBe(false);
    });

    paymentInput.paymentInputType = 'SHABA';

    await waitFor(() => {
      // CARD -> SHABA changes the canonical value domain, so the reset
      // baseline must be transformed together with the live value.
      expect(paymentInput.initialValue).toBe('IR6037991234567890');
      expect(paymentInput.value).toBe('IR6037991234567890');
      expect(paymentInput.isDirty).toBe(false);
    });

    paymentInput.value = initialShaba;
    expect(paymentInput.isDirty).toBe(true);

    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(paymentInput.value).toBe('IR6037991234567890');
      expect(paymentInput.initialValue).toBe(paymentInput.value);
      expect(paymentInput.isDirty).toBe(false);
    });
  },
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
