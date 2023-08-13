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
  bank: Bank;
  isActive: boolean;
}

export interface AccountNode {
  node: Account;
}

export interface AccountEdge {
  edges: AccountNode[];
}

export interface AccountData {
  accountRelay: AccountEdge;
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