import { gql } from '@apollo/client';

// Get all banks and their accounts
export const GetBankNodeQuery = gql`
  query GetBanksQuery {
    bankRelay {
      edges {
        node {
          balance
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

// Simply get name and id of bank for list selection
export const GetBankSimpleListQuery = gql`
  query GetBanksQuery {
    bankRelay {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

// Get all account types
export const GetAccountTypeQuery = gql`
  query {
    __type(name: "AccountType") {
      enumValues {
        name
      }
    }
  }
`;

// Get all account of given bank
export const GetAccountNodeQuery = gql`
  query MyQuery($After: String!, $BankId: IDFilterLookup) {
    accountRelay(
      order: { name: ASC }
      filters: { isActive: true, bank: { id: $BankId, name: {} } }
      first: 100
      after: $After
    ) {
      totalCount
      edges {
        node {
          amount
          name
          currency
          bank {
            id
            name
          }
          lastUpdate
          id
          isActive
          type
          firstTransaction
          lastTransaction
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Given an bank id, get all ids and names of its accounts
export const GetSimpleAccountListQuery = gql`
  query MyQuery($BankId: ID) {
    accountRelay(
      filters: { bank: { id: { exact: $BankId } } }
      order: { name: ASC }
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

// Given an account id, get all transactions of that account
export const GetTransactionListQuery = gql`
  query MyQuery($AccountID: ID) {
    transactionRelay(
      filters: { account: { bank: {}, id: { exact: $AccountID } } }
      order: { date: DESC, amount: ASC }
    ) {
      edges {
        cursor
        node {
          id
          amount
          balance
          date
          isInternal
          requiresDetail
          reviewed
          note
          type
          relatedTransaction {
            id
          }
          retailer {
            id
            name
          }
        }
      }
      totalCount
    }
    accountRelay(filters: { bank: {}, id: { exact: $AccountID } }) {
      edges {
        node {
          currency
        }
      }
    }
  }
`;

// Given an account id, get details of that account
export const GetAccountDetailQuery = gql`
  query MyQuery($AccountID: ID) {
    accountRelay(filters: { bank: {}, id: { exact: $AccountID } }) {
      edges {
        node {
          amount
          name
          currency
          bank {
            id
            name
          }
          lastUpdate
          id
          isActive
          type
          firstTransaction
          lastTransaction
        }
      }
    }
  }
`;

// Get all transaction categories
export const GetTransactionCategoryQuery = gql`
  query {
    __type(name: "TransactionCategory") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GetLastTransactionDate = gql`
  query MyQuery {
    transactionRelay(first: 1, order: { id: DESC }) {
      edges {
        node {
          date
        }
      }
    }
  }
`;

export const CreateTransactionMutation = gql`
  mutation CreateTransactionMutation(
    $amount: Float!
    $date: Date!
    $accountId: ID
    $isInternal: Boolean
    $category: TransactionCategory
    $note: String
    $retailerId: ID
  ) {
    createTransaction(
      data: {
        amount: $amount
        date: $date
        account: { set: $accountId }
        isInternal: $isInternal
        type: $category
        note: $note
        retailer: { set: $retailerId }
      }
    ) {
      id
    }
  }
`;

export const CreateTransactionWithoutRetailerMutation = gql`
  mutation CreateTransactionMutation(
    $amount: Float!
    $date: Date!
    $accountId: ID
    $isInternal: Boolean
    $category: TransactionCategory
    $note: String
  ) {
    createTransaction(
      data: {
        amount: $amount
        date: $date
        account: { set: $accountId }
        isInternal: $isInternal
        type: $category
        note: $note
      }
    ) {
      id
    }
  }
`;
