import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "bank-indicator",
    path: "./bank-indicator/lib/bank-indicator.ts",
    outputPath: "./bank-indicator/dist/bank-indicator.js",
    umdName: "BankIndicator",
    external: [],
    globals: {},
    tsConfigPath: "./tsconfig.json"
  },
  {
    name: "jb-payment-input",
    path: "./lib/jb-payment-input.ts",
    outputPath: "./dist/jb-payment-input.js",
    umdName: "JBPaymentInput",
    external: ["jb-input", "jb-validation"],
    globals: {
      "jb-input": "JBInput",
      "jb-validation": "JBValidation"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-payment-input-react",
    path: "./react/lib/JBPaymentInput.tsx",
    outputPath: "./react/dist/JBPaymentInput.js",
    external: ["jb-payment-input", "jb-input-react", "prop-types", "react"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-input-react": "JBInputReact",
      "jb-payment-input": "JBPaymentInput"
    },
    umdName: "JBPaymentInputReact",
    dir: "./react"
  },
  {
    name: "bank-indicator-react",
    path: "./bank-indicator/react/lib/BankIndicator.tsx",
    outputPath: "./bank-indicator/react/dist/BankIndicator.js",
    external: ["jb-payment-input", 'jb-payment-input/bank-indicator', "prop-types", "react"],
    tsConfigPath: "./react/tsconfig.json",
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-payment-input": "JBPaymentInput"
    },
    umdName: "JBBankIndicatorReact",
    dir: "./react"
  },
];