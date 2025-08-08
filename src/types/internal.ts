export interface Stock {
  id?: string;
  name?: string;
  ticker?: string;
  currency?: string;
}

export interface AccountState {
  accountId?: string;
  accountName?: string;
  accountType?: string;
  bankId?: string;
  bankName?: string;
  accountCurrency: string;
}

export type TransactionFilter = 'all' | 'internal' | 'external';

export interface Retailer {
  id: string;
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
  amount?: number;
  date: string;
  accountId: string;
  isInternal: boolean;
  category: string;
  note: string;
  retailerId?: string;
  id?: string;
}

export interface RetailerSelectionProps {
  id: string;
  category: string;
}

export interface StockTransactionData {
  id?: string;
  date: string;
  stock: Stock;
  shares?: number;
  price: number;
  total: number;
  note: string;
}

export interface StockListInfo {
  firstAdded: boolean;
  loadMore: boolean;
  nextPage: string;
  totalStocks: Stock[];
}

export interface StockAutocompleteItem {
  id: string;
  label: string;
}
