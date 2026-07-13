import { JBDictionary } from "jb-core/i18n";

export type JBBankIndicatorDictionary = {
  paymentCard: string;
};

export const dictionary = new JBDictionary<JBBankIndicatorDictionary>({
  fa: { paymentCard: "کارت بانکی" },
  en: { paymentCard: "Payment card" },
});
