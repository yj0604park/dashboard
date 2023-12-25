import { gql } from '@apollo/client';

export const CreateStockMutation = gql`
  mutation CreateStockMutation($input: StockInput!) {
    createStock(data: $input) {
      id
      name
      ticker
      currency
    }
  }
`;

export const GetStockListQuery = gql`
  query GetStockListQuery {
    stockRelay {
      edges {
        node {
          id
          name
          ticker
          currency
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
