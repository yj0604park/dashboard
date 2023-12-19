import { gql } from '@apollo/client';

// Get all retailers
export const GetRetailerListQuery = gql`
  query MyQuery($After: String) {
    retailerRelay(after: $After) {
      edges {
        node {
          id
          name
          category
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    transactionRelay(first: 1, order: { id: DESC }) {
      edges {
        node {
          date
        }
      }
    }
  }
`;

// Get all retailer types
export const GetRetailerTypeQuery = gql`
  query {
    __type(name: "RetailerType") {
      name
      enumValues {
        name
      }
    }
  }
`;

// Creates a new retailer
export const CreateRetailerMutation = gql`
  mutation CreateRetailerMutation(
    $name: String!
    $type: RetailerType!
    $category: TransactionCategory!
  ) {
    createRetailer(data: { name: $name, type: $type, category: $category }) {
      id
      name
      category
    }
  }
`;
