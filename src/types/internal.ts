import { Stock } from './bank';

export interface AccountState {
  accountId?: number;
  accountName?: string;
  accountType?: string;
  bankId?: number;
  bankName?: string;
  accountCurrency: string;
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
  amount?: number;
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

export interface StockTransactionData {
  id?: number;
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
  id: number;
  label: string;
}
