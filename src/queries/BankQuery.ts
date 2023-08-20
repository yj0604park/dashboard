import { gql } from '@apollo/client';


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

export const GetAccountTypeQuery = gql`
query {
  __type(name:"AccountType"){
    enumValues{
      name
    }
  }
}
`;

export const GetAccountNodeQuery = gql`
query MyQuery($After: String!, $BankId: IDFilterLookup) {
  accountRelay(
    order: {name: ASC}
    filters: {isActive: true, bank: {id: $BankId, name: {}}}
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