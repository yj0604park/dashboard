export interface AccountState {
  accountId?: number;
  accountName?: string;
  accountType?: string;
  bankId?: number;
  bankName?: string;
}

export type TransactionFilter = 'all' | 'internal' | 'external';

export interface Retailer {
  id: number;
  label: string;
  category: string;
}

export interface RetailerList {
  firstAdded: boolean;
  loadMore: boolean;
  nextPage: string;
  totalRetailers: Retailer[];
}

export interface TransactionCreationData {
  amount: number | string;
  date: string;
  accountId: number;
  isInternal: boolean;
  category: string;
  note: string;
  retailerId?: number;
  id?: number;
}

export interface RetailerSelectionProps {
  id: number;
  category: string;
}
