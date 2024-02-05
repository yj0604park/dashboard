import { gql } from '@apollo/client';

// Get all retailers
export const GetAmazonOrderQuery = gql`
  query GetAmazonOrderQuery {
    amazonOrderRelay(order: { date: DESC }) {
      edges {
        node {
          date
          id
          isReturned
          item
          transaction {
            id
            amount
          }
          returnTransaction {
            id
            amount
          }
        }
      }
    }
  }
`;
