export interface PageInfo {
  hasNextPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Bank {
  id: number;
  name: string;
  balance: JSON;
  accountSet?: AccountEdge;
}

export interface BankNode {
  node: Bank;
}

export interface BankEdge {
  edges: BankNode[];
}

export interface BankData {
  bankRelay: BankEdge;
}

export interface Account {
  id: number;
  name: string;
  currency: string;
  amount: number;
  lastUpdate: Date;
  firstTransaction?: Date;
  lastTransaction?: Date;
  bank: Bank;
  isActive: boolean;
  type: string;
}

export interface AccountNode {
  node: Account;
}

export interface AccountEdge {
  edges: AccountNode[];
  totalCount?: number;
}

export interface AccountData {
  accountRelay: AccountEdge;
}

export interface Retailer {
  id: number;
  name: string;
  category?: string;
}

export interface RetailerNode {
  node: Retailer;
}

export interface RetailerEdge {
  edges: RetailerNode[];
  pageInfo?: PageInfo;
}

export interface RetailerData {
  retailerRelay: RetailerEdge;
  transactionRelay?: TransactionEdge;
}

export interface Transaction {
  id: number;
  amount: number;
  balance: number;
  date: Date;
  isInternal: boolean;
  requiresDetail: boolean;
  reviewed: boolean;
  note: string;
  type: string;
  relatedTransaction?: TransactionNode;
  retailer?: Retailer;
}

export interface TransactionNode {
  node: Transaction;
}

export interface TransactionEdge {
  edges: TransactionNode[];
}

export interface TransactionData {
  transactionRelay: TransactionEdge;
  totalCount?: number;
  accountRelay?: AccountEdge;
}

export interface AmountSnpahost {
  id: number;
  currency: string;
  amount: number;
  summary: any;
  date: Date;
}

export interface AmountSnapshotNode {
  node: AmountSnpahost;
}

export interface AmountSnapshotEdge {
  edges: AmountSnapshotNode[];
}

export interface AmountSnapshotData {
  krwSnapshot: AmountSnapshotEdge;
  usdSnapshot: AmountSnapshotEdge;
}

export interface Salary {
  id: number;
  grossPay: number;
  date: Date;
  netPay: number;
  totalDeduction: number;
  totalAdjustment: number;
  totalWithheld: number;
  transaction: TransactionNode;
  payDetail: JSON;
  taxDetail: JSON;
  deductionDetail: JSON;
  adjustmentDetail: JSON;
}

export interface SalaryNode {
  node: Salary;
}

export interface SalaryEdge {
  edges: SalaryNode[];
  totalCount?: number;
}

export interface SalaryData {
  salaryRelay: SalaryEdge;
}

export interface Stock {
  id?: number;
  name?: string;
  ticker?: string;
  currency?: string;
}

export interface StockNode {
  node: Stock;
}

export interface StockEdge {
  edges: StockNode[];
  pageInfo?: PageInfo;
}

export interface StockData {
  stockRelay: StockEdge;
}

export interface StockTransaction {
  id?: number;
  date?: Date;
  stock?: Stock;
  price?: number;
  quantity?: number;
  transaction?: TransactionNode;
}

export interface AmazonOrder {
  id: number;
  date: Date;
  item: string;
  isReturned: boolean;
  transaction?: Transaction;
}

export interface AmazonOrderNode {
  node: AmazonOrder;
}

export interface AmazonOrderEdge {
  edges: AmazonOrderNode[];
  pageInfo?: PageInfo;
}

export interface AmazonOrderData {
  amazonOrderRelay: AmazonOrderEdge;
}
