import { gql } from '@apollo/client';

// Get last 100 amount snapshots
export const GetAmountSnapshotQuery = gql`
  query MyQuery($startDate: Date) {
    krwSnapshot: amountSnapshotRelay(
      order: { date: ASC }
      filters: { currency: { exact: KRW }, date: { gte: $startDate } }
      last: 100
    ) {
      edges {
        node {
          id
          amount
          currency
          date
          summary
        }
      }
    }
    usdSnapshot: amountSnapshotRelay(
      order: { date: ASC }
      filters: { currency: { exact: USD }, date: { gte: $startDate } }
      last: 100
    ) {
      edges {
        node {
          id
          amount
          currency
          date
          summary
        }
      }
    }
  }
`;
