import type { Meta, StoryObj } from "@storybook/react-vite";
import { BankIndicator } from "jb-payment-input/bank-indicator/react";
import { JBPaymentInput } from "jb-payment-input/react";
import "../../../docs/styles/ant-design.css";
import "../../../docs/styles/aurora.css";
import "../../../docs/styles/bootstrap.css";
import "../../../docs/styles/candy.css";
import "../../../docs/styles/carbon.css";
import "../../../docs/styles/cupertino.css";
import "../../../docs/styles/fluent.css";
import "../../../docs/styles/forest.css";
import "../../../docs/styles/material.css";
import "../../../docs/styles/porcelain.css";
import "../../../docs/styles/sunset.css";
import "../../../docs/styles/terminal.css";
import "../../jb-input/stories/styles/style-ant-design.css";
import "../../jb-input/stories/styles/style-aurora.css";
import "../../jb-input/stories/styles/style-bootstrap.css";
import "../../jb-input/stories/styles/style-candy.css";
import "../../jb-input/stories/styles/style-carbon.css";
import "../../jb-input/stories/styles/style-cupertino.css";
import "../../jb-input/stories/styles/style-fluent.css";
import "../../jb-input/stories/styles/style-forest.css";
import "../../jb-input/stories/styles/style-material.css";
import "../../jb-input/stories/styles/style-porcelain.css";
import "../../jb-input/stories/styles/style-sunset.css";
import "../../jb-input/stories/styles/style-terminal.css";

const meta = {
  title: "Components/form elements/Inputs/JBPaymentInput/Style",
  component: JBPaymentInput,
} satisfies Meta<typeof JBPaymentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", className: "carbon-style" },
  { name: "Aurora", className: "aurora-style" },
  { name: "Forest", className: "forest-style" },
  { name: "Sunset", className: "sunset-style" },
  { name: "Porcelain", className: "porcelain-style" },
  { name: "Candy", className: "candy-style" },
  { name: "Terminal", className: "terminal-style" },
  { name: "Material", className: "material-style" },
  { name: "Fluent", className: "fluent-style" },
  { name: "Bootstrap", className: "bootstrap-style" },
  { name: "Cupertino", className: "cupertino-style" },
  { name: "Ant Design", className: "ant-design-style" },
];

function PaymentInputStyleSample({ className }: { className: string }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        minWidth: 0,
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <JBPaymentInput className={className} label="Card number" value="6037991234567890" message="Detected bank card" inputType="CARD">
        <BankIndicator slot="end-section" prefix="603799" />
      </JBPaymentInput>
      <JBPaymentInput className={className} label="IBAN / Shaba" value="IR120000000000000000000000" inputType="SHABA" />
      <JBPaymentInput className={className} label="Validation error" value="603799123456789" error="Enter all 16 digits of the card number" inputType="CARD" />
      <JBPaymentInput className={className} label="Disabled card" value="6037991234567890" inputType="CARD" disabled />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(21rem, 1fr))",
        gap: "1.25rem",
        alignItems: "start",
        width: "min(100%, 82rem)",
      }}
    >
      {styleSamples.map(sample => (
        <section
          key={sample.className}
          className={sample.className}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
        >
          <div
            style={{
              width: "100%",
              color: "var(--jb-text-primary, #334155)",
              fontSize: "0.875rem",
              fontWeight: 700,
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {sample.name}
          </div>
          <PaymentInputStyleSample className={sample.className} />
        </section>
      ))}
    </div>
  ),
};

export const Default: Story = { name: "Default", render: () => <PaymentInputStyleSample className="" /> };
export const Carbon: Story = { name: "Carbon", render: () => <PaymentInputStyleSample className="carbon-style" /> };
export const Aurora: Story = { name: "Aurora", render: () => <PaymentInputStyleSample className="aurora-style" /> };
export const Forest: Story = { name: "Forest", render: () => <PaymentInputStyleSample className="forest-style" /> };
export const Sunset: Story = { name: "Sunset", render: () => <PaymentInputStyleSample className="sunset-style" /> };
export const Porcelain: Story = { name: "Porcelain", render: () => <PaymentInputStyleSample className="porcelain-style" /> };
export const Candy: Story = { name: "Candy", render: () => <PaymentInputStyleSample className="candy-style" /> };
export const Terminal: Story = { name: "Terminal", render: () => <PaymentInputStyleSample className="terminal-style" /> };
export const Material: Story = { name: "Material", render: () => <PaymentInputStyleSample className="material-style" /> };
export const Fluent: Story = { name: "Fluent", render: () => <PaymentInputStyleSample className="fluent-style" /> };
export const Bootstrap: Story = { name: "Bootstrap", render: () => <PaymentInputStyleSample className="bootstrap-style" /> };
export const Cupertino: Story = { name: "Cupertino", render: () => <PaymentInputStyleSample className="cupertino-style" /> };
export const AntDesign: Story = { name: "Ant Design", render: () => <PaymentInputStyleSample className="ant-design-style" /> };
