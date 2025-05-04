import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-payment-input",
    path: "./lib/jb-payment-input.ts",
    outputPath: "./dist/jb-payment-input.js",
    umdName: "JBPaymentInput",
    external: ["jb-input", "jb-validation", "jb-core"],
    globals: {
      "jb-input": "JBInput",
      "jb-validation": "JBValidation",
      "jb-core":"JBCore"
    },
  },
  {
    name: "bank-indicator",
    path: "./bank-indicator/lib/bank-indicator.ts",
    outputPath: "./bank-indicator/dist/bank-indicator.js",
    umdName: "BankIndicator",
    external: ["jb-payment-input"],
    globals: {
      "jb-payment-input":"JBPaymentInput"
    },
    dir: "./bank-indicator",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-payment-input-react",
    path: "./react/lib/JBPaymentInput.tsx",
    outputPath: "./react/dist/JBPaymentInput.js",
    external: ["jb-input","jb-payment-input", "jb-input-react", "prop-types", "react", "jb-core"],
    globals: {
      react: "React",
      "jb-input":"JBInput",
      "prop-types": "PropTypes",
      "jb-input-react": "JBInputReact",
      "jb-payment-input": "JBPaymentInput",
      
    },
    umdName: "JBPaymentInputReact",
    dir: "./react"
  },
  {
    name: "bank-indicator-react",
    path: "./bank-indicator/react/lib/BankIndicator.tsx",
    outputPath: "./bank-indicator/react/dist/BankIndicator.js",
    external: ["jb-payment-input", 'jb-payment-input/bank-indicator', "prop-types", "react"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-payment-input": "JBPaymentInput",
      "jb-payment-input/bank-indicator": "BankIndicator",
    },
    umdName: "JBBankIndicatorReact",
    dir: "./bank-indicator/react",
  },
];