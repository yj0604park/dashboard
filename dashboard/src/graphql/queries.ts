import { gql } from '@apollo/client';

export const GET_BANK_NODE = gql`
  query GetBankNodeQuery {
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

export const GET_BANK_SIMPLE_LIST = gql`
  query GetBankSimpleListQuery {
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