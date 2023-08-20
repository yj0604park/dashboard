
export interface AccountState {
  accountId?: number;
  accountName?: string;
  bankId?: number;
  bankName?: string;
}

export type TransactionFilter = "all" | "internal" | "external";