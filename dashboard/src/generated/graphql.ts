import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  GlobalID: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AccountFilter = {
  AND?: InputMaybe<AccountFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<AccountFilter>;
  OR?: InputMaybe<AccountFilter>;
  amount?: InputMaybe<DecimalComparisonFilterLookup>;
  bank: BankFilter;
  currency?: InputMaybe<CurrencyTypeFilterLookup>;
  id?: InputMaybe<IdBaseFilterLookup>;
  isActive?: InputMaybe<BoolBaseFilterLookup>;
  lastUpdate?: InputMaybe<DatetimeDatetimeFilterLookup>;
  name?: InputMaybe<StrFilterLookup>;
  type?: InputMaybe<AccountTypeFilterLookup>;
};

export type AccountInput = {
  bank: OneToManyInput;
  currency?: InputMaybe<CurrencyType>;
  name: Scalars['String']['input'];
  type?: InputMaybe<AccountType>;
};

export type AccountNode = Node & {
  __typename?: 'AccountNode';
  amount: Scalars['Decimal']['output'];
  bank: BankNode;
  currency: CurrencyType;
  firstTransaction?: Maybe<Scalars['Date']['output']>;
  id: Scalars['GlobalID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastTransaction?: Maybe<Scalars['Date']['output']>;
  lastUpdate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  type: AccountType;
};

/** A connection to a list of items. */
export type AccountNodeConnection = {
  __typename?: 'AccountNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<AccountNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type AccountNodeEdge = {
  __typename?: 'AccountNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: AccountNode;
};

export type AccountOrder = {
  bank?: InputMaybe<BankOrder>;
  lastUpdate?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

export enum AccountType {
  CheckingAccount = 'CHECKING_ACCOUNT',
  CreditCard = 'CREDIT_CARD',
  InstallmentSaving = 'INSTALLMENT_SAVING',
  Loan = 'LOAN',
  SavingsAccount = 'SAVINGS_ACCOUNT',
  Stock = 'STOCK',
  TimeDeposit = 'TIME_DEPOSIT'
}

export type AccountTypeFilterLookup = {
  /** Case-sensitive containment test. Filter will be skipped on `null` value */
  contains?: InputMaybe<AccountType>;
  /** Case-sensitive ends-with. Filter will be skipped on `null` value */
  endsWith?: InputMaybe<AccountType>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<AccountType>;
  /** Case-insensitive containment test. Filter will be skipped on `null` value */
  iContains?: InputMaybe<AccountType>;
  /** Case-insensitive ends-with. Filter will be skipped on `null` value */
  iEndsWith?: InputMaybe<AccountType>;
  /** Case-insensitive exact match. Filter will be skipped on `null` value */
  iExact?: InputMaybe<AccountType>;
  /** Case-insensitive regular expression match. Filter will be skipped on `null` value */
  iRegex?: InputMaybe<AccountType>;
  /** Case-insensitive starts-with. Filter will be skipped on `null` value */
  iStartsWith?: InputMaybe<AccountType>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<AccountType>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Case-sensitive regular expression match. Filter will be skipped on `null` value */
  regex?: InputMaybe<AccountType>;
  /** Case-sensitive starts-with. Filter will be skipped on `null` value */
  startsWith?: InputMaybe<AccountType>;
};

export type AmazonOrderInput = {
  date: Scalars['Date']['input'];
  isReturned?: InputMaybe<Scalars['Boolean']['input']>;
  item: Scalars['String']['input'];
  returnTransaction?: InputMaybe<OneToManyInput>;
  transaction?: InputMaybe<OneToManyInput>;
};

export type AmazonOrderNode = Node & {
  __typename?: 'AmazonOrderNode';
  date: Scalars['Date']['output'];
  id: Scalars['GlobalID']['output'];
  isReturned: Scalars['Boolean']['output'];
  item: Scalars['String']['output'];
  returnTransaction?: Maybe<TransactionNode>;
  transaction?: Maybe<TransactionNode>;
};

/** A connection to a list of items. */
export type AmazonOrderNodeConnection = {
  __typename?: 'AmazonOrderNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<AmazonOrderNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type AmazonOrderNodeEdge = {
  __typename?: 'AmazonOrderNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: AmazonOrderNode;
};

export type AmazonOrderOrder = {
  date?: InputMaybe<Ordering>;
};

export type AmountSnapshotFilter = {
  AND?: InputMaybe<AmountSnapshotFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<AmountSnapshotFilter>;
  OR?: InputMaybe<AmountSnapshotFilter>;
  currency?: InputMaybe<CurrencyTypeFilterLookup>;
  date?: InputMaybe<DateDateFilterLookup>;
  id?: InputMaybe<IdBaseFilterLookup>;
};

export type AmountSnapshotNode = Node & {
  __typename?: 'AmountSnapshotNode';
  amount: Scalars['Decimal']['output'];
  currency: CurrencyType;
  date: Scalars['Date']['output'];
  id: Scalars['GlobalID']['output'];
  summary?: Maybe<Scalars['JSON']['output']>;
};

/** A connection to a list of items. */
export type AmountSnapshotNodeConnection = {
  __typename?: 'AmountSnapshotNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<AmountSnapshotNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type AmountSnapshotNodeEdge = {
  __typename?: 'AmountSnapshotNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: AmountSnapshotNode;
};

export type AmountSnapshotOrder = {
  date?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

export type BankBalance = {
  __typename?: 'BankBalance';
  currency: Scalars['String']['output'];
  value: Scalars['Decimal']['output'];
};

export type BankFilter = {
  AND?: InputMaybe<BankFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<BankFilter>;
  OR?: InputMaybe<BankFilter>;
  id?: InputMaybe<IdBaseFilterLookup>;
  name?: InputMaybe<StrFilterLookup>;
};

export type BankNode = Node & {
  __typename?: 'BankNode';
  accountSet: AccountNodeConnection;
  balance: Array<BankBalance>;
  id: Scalars['GlobalID']['output'];
  name: Scalars['String']['output'];
};


export type BankNodeAccountSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};

/** A connection to a list of items. */
export type BankNodeConnection = {
  __typename?: 'BankNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<BankNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type BankNodeEdge = {
  __typename?: 'BankNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: BankNode;
};

export type BankOrder = {
  name?: InputMaybe<Ordering>;
};

export type BoolBaseFilterLookup = {
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['Boolean']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CurrencyType {
  Krw = 'KRW',
  Usd = 'USD'
}

export type CurrencyTypeFilterLookup = {
  /** Case-sensitive containment test. Filter will be skipped on `null` value */
  contains?: InputMaybe<CurrencyType>;
  /** Case-sensitive ends-with. Filter will be skipped on `null` value */
  endsWith?: InputMaybe<CurrencyType>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<CurrencyType>;
  /** Case-insensitive containment test. Filter will be skipped on `null` value */
  iContains?: InputMaybe<CurrencyType>;
  /** Case-insensitive ends-with. Filter will be skipped on `null` value */
  iEndsWith?: InputMaybe<CurrencyType>;
  /** Case-insensitive exact match. Filter will be skipped on `null` value */
  iExact?: InputMaybe<CurrencyType>;
  /** Case-insensitive regular expression match. Filter will be skipped on `null` value */
  iRegex?: InputMaybe<CurrencyType>;
  /** Case-insensitive starts-with. Filter will be skipped on `null` value */
  iStartsWith?: InputMaybe<CurrencyType>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<CurrencyType>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Case-sensitive regular expression match. Filter will be skipped on `null` value */
  regex?: InputMaybe<CurrencyType>;
  /** Case-sensitive starts-with. Filter will be skipped on `null` value */
  startsWith?: InputMaybe<CurrencyType>;
};

export type DateDateFilterLookup = {
  day?: InputMaybe<IntComparisonFilterLookup>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['Date']['input']>;
  /** Greater than. Filter will be skipped on `null` value */
  gt?: InputMaybe<Scalars['Date']['input']>;
  /** Greater than or equal to. Filter will be skipped on `null` value */
  gte?: InputMaybe<Scalars['Date']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['Date']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isoWeekDay?: InputMaybe<IntComparisonFilterLookup>;
  isoYear?: InputMaybe<IntComparisonFilterLookup>;
  /** Less than. Filter will be skipped on `null` value */
  lt?: InputMaybe<Scalars['Date']['input']>;
  /** Less than or equal to. Filter will be skipped on `null` value */
  lte?: InputMaybe<Scalars['Date']['input']>;
  month?: InputMaybe<IntComparisonFilterLookup>;
  quarter?: InputMaybe<IntComparisonFilterLookup>;
  /** Inclusive range test (between) */
  range?: InputMaybe<DateRangeLookup>;
  week?: InputMaybe<IntComparisonFilterLookup>;
  weekDay?: InputMaybe<IntComparisonFilterLookup>;
  year?: InputMaybe<IntComparisonFilterLookup>;
};

export type DateRangeLookup = {
  end?: InputMaybe<Scalars['Date']['input']>;
  start?: InputMaybe<Scalars['Date']['input']>;
};

export type DatetimeDatetimeFilterLookup = {
  date?: InputMaybe<IntComparisonFilterLookup>;
  day?: InputMaybe<IntComparisonFilterLookup>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['DateTime']['input']>;
  /** Greater than. Filter will be skipped on `null` value */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Greater than or equal to. Filter will be skipped on `null` value */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  hour?: InputMaybe<IntComparisonFilterLookup>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isoWeekDay?: InputMaybe<IntComparisonFilterLookup>;
  isoYear?: InputMaybe<IntComparisonFilterLookup>;
  /** Less than. Filter will be skipped on `null` value */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Less than or equal to. Filter will be skipped on `null` value */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  minute?: InputMaybe<IntComparisonFilterLookup>;
  month?: InputMaybe<IntComparisonFilterLookup>;
  quarter?: InputMaybe<IntComparisonFilterLookup>;
  /** Inclusive range test (between) */
  range?: InputMaybe<DatetimeRangeLookup>;
  second?: InputMaybe<IntComparisonFilterLookup>;
  time?: InputMaybe<IntComparisonFilterLookup>;
  week?: InputMaybe<IntComparisonFilterLookup>;
  weekDay?: InputMaybe<IntComparisonFilterLookup>;
  year?: InputMaybe<IntComparisonFilterLookup>;
};

export type DatetimeRangeLookup = {
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalComparisonFilterLookup = {
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['Decimal']['input']>;
  /** Greater than. Filter will be skipped on `null` value */
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  /** Greater than or equal to. Filter will be skipped on `null` value */
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than. Filter will be skipped on `null` value */
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  /** Less than or equal to. Filter will be skipped on `null` value */
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  /** Inclusive range test (between) */
  range?: InputMaybe<DecimalRangeLookup>;
};

export type DecimalRangeLookup = {
  end?: InputMaybe<Scalars['Decimal']['input']>;
  start?: InputMaybe<Scalars['Decimal']['input']>;
};

export type IdBaseFilterLookup = {
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['ID']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IntComparisonFilterLookup = {
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than. Filter will be skipped on `null` value */
  gt?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to. Filter will be skipped on `null` value */
  gte?: InputMaybe<Scalars['Int']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than. Filter will be skipped on `null` value */
  lt?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to. Filter will be skipped on `null` value */
  lte?: InputMaybe<Scalars['Int']['input']>;
  /** Inclusive range test (between) */
  range?: InputMaybe<IntRangeLookup>;
};

export type IntRangeLookup = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: AccountNode;
  createAmazonOrder: AmazonOrderNode;
  createRetailer: RetailerNode;
  createStock: StockNode;
  createStockTransaction: StockTransactionNode;
  createTransaction: TransactionNode;
};


export type MutationCreateAccountArgs = {
  data: AccountInput;
};


export type MutationCreateAmazonOrderArgs = {
  data: AmazonOrderInput;
};


export type MutationCreateRetailerArgs = {
  data: RetailerInput;
};


export type MutationCreateStockArgs = {
  data: StockInput;
};


export type MutationCreateStockTransactionArgs = {
  data: StockTransactionInput;
};


export type MutationCreateTransactionArgs = {
  data: TransactionInput;
};

/** An object with a Globally Unique ID */
export type Node = {
  /** The Globally Unique ID of this object */
  id: Scalars['GlobalID']['output'];
};

export type OneToManyInput = {
  set?: InputMaybe<Scalars['ID']['input']>;
};

export enum Ordering {
  Asc = 'ASC',
  AscNullsFirst = 'ASC_NULLS_FIRST',
  AscNullsLast = 'ASC_NULLS_LAST',
  Desc = 'DESC',
  DescNullsFirst = 'DESC_NULLS_FIRST',
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** Information to aid in pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  accountRelay: AccountNodeConnection;
  amazonOrderRelay: AmazonOrderNodeConnection;
  amountSnapshotRelay: AmountSnapshotNodeConnection;
  bankRelay: BankNodeConnection;
  retailerRelay: RetailerNodeConnection;
  salaryRelay: SalaryNodeConnection;
  salaryYears: Array<Scalars['Int']['output']>;
  stockRelay: StockNodeConnection;
  transactionRelay: TransactionNodeConnection;
};


export type QueryAccountRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};


export type QueryAmazonOrderRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AmazonOrderOrder>;
};


export type QueryAmountSnapshotRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AmountSnapshotFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AmountSnapshotOrder>;
};


export type QueryBankRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<BankFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRetailerRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<RetailerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySalaryRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<SalaryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SalaryOrder>;
};


export type QueryStockRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTransactionRelayArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<TransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TransactionOrder>;
};

export type RetailerFilter = {
  AND?: InputMaybe<RetailerFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<RetailerFilter>;
  OR?: InputMaybe<RetailerFilter>;
  category?: InputMaybe<TransactionCategoryFilterLookup>;
  id?: InputMaybe<IdBaseFilterLookup>;
  name?: InputMaybe<StrFilterLookup>;
};

export type RetailerInput = {
  category?: InputMaybe<TransactionCategory>;
  name: Scalars['String']['input'];
  type?: InputMaybe<RetailerType>;
};

export type RetailerNode = Node & {
  __typename?: 'RetailerNode';
  category: TransactionCategory;
  id: Scalars['GlobalID']['output'];
  name: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type RetailerNodeConnection = {
  __typename?: 'RetailerNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<RetailerNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type RetailerNodeEdge = {
  __typename?: 'RetailerNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: RetailerNode;
};

export enum RetailerType {
  Bank = 'BANK',
  Etc = 'ETC',
  Income = 'INCOME',
  Person = 'PERSON',
  Restaurant = 'RESTAURANT',
  Service = 'SERVICE',
  Store = 'STORE'
}

export type SalaryFilter = {
  AND?: InputMaybe<SalaryFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<SalaryFilter>;
  OR?: InputMaybe<SalaryFilter>;
  date?: InputMaybe<DateDateFilterLookup>;
  id?: InputMaybe<IdBaseFilterLookup>;
};

export type SalaryNode = Node & {
  __typename?: 'SalaryNode';
  adjustmentDetail: Scalars['JSON']['output'];
  date: Scalars['Date']['output'];
  deductionDetail: Scalars['JSON']['output'];
  grossPay: Scalars['Decimal']['output'];
  id: Scalars['GlobalID']['output'];
  netPay: Scalars['Decimal']['output'];
  payDetail: Scalars['JSON']['output'];
  taxDetail: Scalars['JSON']['output'];
  totalAdjustment: Scalars['Decimal']['output'];
  totalDeduction: Scalars['Decimal']['output'];
  totalWithheld: Scalars['Decimal']['output'];
  transaction: TransactionNode;
};

/** A connection to a list of items. */
export type SalaryNodeConnection = {
  __typename?: 'SalaryNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<SalaryNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type SalaryNodeEdge = {
  __typename?: 'SalaryNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: SalaryNode;
};

export type SalaryOrder = {
  date?: InputMaybe<Ordering>;
};

export type StockInput = {
  currency?: InputMaybe<CurrencyType>;
  name: Scalars['String']['input'];
  ticker?: InputMaybe<Scalars['String']['input']>;
};

export type StockNode = Node & {
  __typename?: 'StockNode';
  currency: CurrencyType;
  id: Scalars['GlobalID']['output'];
  name: Scalars['String']['output'];
  ticker?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of items. */
export type StockNodeConnection = {
  __typename?: 'StockNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<StockNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type StockNodeEdge = {
  __typename?: 'StockNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: StockNode;
};

export type StockTransactionInput = {
  account: OneToManyInput;
  amount: Scalars['Decimal']['input'];
  date: Scalars['Date']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Decimal']['input'];
  relatedTransaction?: InputMaybe<OneToManyInput>;
  shares: Scalars['Decimal']['input'];
  stock: OneToManyInput;
};

export type StockTransactionNode = Node & {
  __typename?: 'StockTransactionNode';
  account: AccountNode;
  amount: Scalars['Decimal']['output'];
  id: Scalars['GlobalID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  relatedTransaction: TransactionNode;
  shares: Scalars['Decimal']['output'];
  stock: StockNode;
};

export type StrFilterLookup = {
  /** Case-sensitive containment test. Filter will be skipped on `null` value */
  contains?: InputMaybe<Scalars['String']['input']>;
  /** Case-sensitive ends-with. Filter will be skipped on `null` value */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive containment test. Filter will be skipped on `null` value */
  iContains?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive ends-with. Filter will be skipped on `null` value */
  iEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive exact match. Filter will be skipped on `null` value */
  iExact?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive regular expression match. Filter will be skipped on `null` value */
  iRegex?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive starts-with. Filter will be skipped on `null` value */
  iStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Case-sensitive regular expression match. Filter will be skipped on `null` value */
  regex?: InputMaybe<Scalars['String']['input']>;
  /** Case-sensitive starts-with. Filter will be skipped on `null` value */
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum TransactionCategory {
  Cash = 'CASH',
  Clothing = 'CLOTHING',
  DailyNecessity = 'DAILY_NECESSITY',
  EatOut = 'EAT_OUT',
  Etc = 'ETC',
  Grocery = 'GROCERY',
  Housing = 'HOUSING',
  Income = 'INCOME',
  Interest = 'INTEREST',
  Leisure = 'LEISURE',
  Medical = 'MEDICAL',
  Membership = 'MEMBERSHIP',
  Parenting = 'PARENTING',
  Present = 'PRESENT',
  Service = 'SERVICE',
  Stock = 'STOCK',
  Transfer = 'TRANSFER',
  Transportation = 'TRANSPORTATION'
}

export type TransactionCategoryFilterLookup = {
  /** Case-sensitive containment test. Filter will be skipped on `null` value */
  contains?: InputMaybe<TransactionCategory>;
  /** Case-sensitive ends-with. Filter will be skipped on `null` value */
  endsWith?: InputMaybe<TransactionCategory>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<TransactionCategory>;
  /** Case-insensitive containment test. Filter will be skipped on `null` value */
  iContains?: InputMaybe<TransactionCategory>;
  /** Case-insensitive ends-with. Filter will be skipped on `null` value */
  iEndsWith?: InputMaybe<TransactionCategory>;
  /** Case-insensitive exact match. Filter will be skipped on `null` value */
  iExact?: InputMaybe<TransactionCategory>;
  /** Case-insensitive regular expression match. Filter will be skipped on `null` value */
  iRegex?: InputMaybe<TransactionCategory>;
  /** Case-insensitive starts-with. Filter will be skipped on `null` value */
  iStartsWith?: InputMaybe<TransactionCategory>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<TransactionCategory>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Case-sensitive regular expression match. Filter will be skipped on `null` value */
  regex?: InputMaybe<TransactionCategory>;
  /** Case-sensitive starts-with. Filter will be skipped on `null` value */
  startsWith?: InputMaybe<TransactionCategory>;
};

export type TransactionFilter = {
  AND?: InputMaybe<TransactionFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<TransactionFilter>;
  OR?: InputMaybe<TransactionFilter>;
  account: AccountFilter;
  date?: InputMaybe<DateDateFilterLookup>;
  id?: InputMaybe<IdBaseFilterLookup>;
};

export type TransactionInput = {
  account: OneToManyInput;
  amount: Scalars['Decimal']['input'];
  date: Scalars['Date']['input'];
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  retailer?: InputMaybe<OneToManyInput>;
  type?: InputMaybe<TransactionCategory>;
};

export type TransactionNode = Node & {
  __typename?: 'TransactionNode';
  account: AccountNode;
  amount: Scalars['Decimal']['output'];
  balance?: Maybe<Scalars['Decimal']['output']>;
  date: Scalars['Date']['output'];
  getSortingAmount: Scalars['Float']['output'];
  id: Scalars['GlobalID']['output'];
  isInternal: Scalars['Boolean']['output'];
  note?: Maybe<Scalars['String']['output']>;
  relatedTransaction?: Maybe<TransactionNode>;
  requiresDetail: Scalars['Boolean']['output'];
  retailer?: Maybe<RetailerNode>;
  reviewed: Scalars['Boolean']['output'];
  type: TransactionCategory;
};

/** A connection to a list of items. */
export type TransactionNodeConnection = {
  __typename?: 'TransactionNodeConnection';
  /** Contains the nodes in this connection */
  edges: Array<TransactionNodeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type TransactionNodeEdge = {
  __typename?: 'TransactionNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: TransactionNode;
};

export type TransactionOrder = {
  account?: InputMaybe<AccountOrder>;
  amount?: InputMaybe<Ordering>;
  balance?: InputMaybe<Ordering>;
  date?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
};

export type GetBankNodeWithBalanceQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBankNodeWithBalanceQueryQuery = { __typename?: 'Query', bankRelay: { __typename?: 'BankNodeConnection', edges: Array<{ __typename?: 'BankNodeEdge', node: { __typename?: 'BankNode', id: any, name: string, balance: Array<{ __typename?: 'BankBalance', currency: string, value: any }>, accountSet: { __typename?: 'AccountNodeConnection', totalCount?: number | null, edges: Array<{ __typename?: 'AccountNodeEdge', node: { __typename?: 'AccountNode', type: AccountType, id: any, currency: CurrencyType, amount: any, lastUpdate?: any | null, name: string, isActive: boolean } }> } } }> } };

export type GetBankSimpleListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBankSimpleListQueryQuery = { __typename?: 'Query', bankRelay: { __typename?: 'BankNodeConnection', edges: Array<{ __typename?: 'BankNodeEdge', node: { __typename?: 'BankNode', id: any, name: string, balance: Array<{ __typename?: 'BankBalance', currency: string, value: any }> } }> } };


export const GetBankNodeWithBalanceQueryDocument = gql`
    query GetBankNodeWithBalanceQuery {
  bankRelay {
    edges {
      node {
        balance {
          currency
          value
        }
        id
        name
        accountSet {
          edges {
            node {
              type
              id
              currency
              amount
              lastUpdate
              name
              isActive
            }
          }
          totalCount
        }
      }
    }
  }
}
    `;

/**
 * __useGetBankNodeWithBalanceQueryQuery__
 *
 * To run a query within a React component, call `useGetBankNodeWithBalanceQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankNodeWithBalanceQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankNodeWithBalanceQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBankNodeWithBalanceQueryQuery(baseOptions?: Apollo.QueryHookOptions<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>(GetBankNodeWithBalanceQueryDocument, options);
      }
export function useGetBankNodeWithBalanceQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>(GetBankNodeWithBalanceQueryDocument, options);
        }
export function useGetBankNodeWithBalanceQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>(GetBankNodeWithBalanceQueryDocument, options);
        }
export type GetBankNodeWithBalanceQueryQueryHookResult = ReturnType<typeof useGetBankNodeWithBalanceQueryQuery>;
export type GetBankNodeWithBalanceQueryLazyQueryHookResult = ReturnType<typeof useGetBankNodeWithBalanceQueryLazyQuery>;
export type GetBankNodeWithBalanceQuerySuspenseQueryHookResult = ReturnType<typeof useGetBankNodeWithBalanceQuerySuspenseQuery>;
export type GetBankNodeWithBalanceQueryQueryResult = Apollo.QueryResult<GetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQueryVariables>;
export const GetBankSimpleListQueryDocument = gql`
    query GetBankSimpleListQuery {
  bankRelay {
    edges {
      node {
        id
        name
        balance {
          currency
          value
        }
      }
    }
  }
}
    `;

/**
 * __useGetBankSimpleListQueryQuery__
 *
 * To run a query within a React component, call `useGetBankSimpleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankSimpleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankSimpleListQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBankSimpleListQueryQuery(baseOptions?: Apollo.QueryHookOptions<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>(GetBankSimpleListQueryDocument, options);
      }
export function useGetBankSimpleListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>(GetBankSimpleListQueryDocument, options);
        }
export function useGetBankSimpleListQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>(GetBankSimpleListQueryDocument, options);
        }
export type GetBankSimpleListQueryQueryHookResult = ReturnType<typeof useGetBankSimpleListQueryQuery>;
export type GetBankSimpleListQueryLazyQueryHookResult = ReturnType<typeof useGetBankSimpleListQueryLazyQuery>;
export type GetBankSimpleListQuerySuspenseQueryHookResult = ReturnType<typeof useGetBankSimpleListQuerySuspenseQuery>;
export type GetBankSimpleListQueryQueryResult = Apollo.QueryResult<GetBankSimpleListQueryQuery, GetBankSimpleListQueryQueryVariables>;