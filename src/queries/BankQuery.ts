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
        }
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
query MyQuery($After: String!) {
  accountRelay(
    order: {bank: {name: ASC}}
    filters: {isActive: true, bank: {}}
    first: 10
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