export type TransactionKind = "INCOME" | "EXPENSE";

export type TransactionView = {
  id: string;
  type: TransactionKind;
  amount: string;
  category: string;
  description: string | null;
  date: string;
};

export type FinancialSummary = {
  income: string;
  expense: string;
  balance: string;
};

export type TransactionActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"type" | "amount" | "category" | "description" | "date", string[]>>;
};
