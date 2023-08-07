import { gql } from '@apollo/client';

export const GetAmountSnapshotQuery = gql`
query MyQuery {
  krwSnapshot: amountSnapshot(
    order: {date: ASC}
    filters: {date: {gte: "2023-01-01"}, currency: {exact: "KRW"}}
  ) {
    id
    currency
    amount
    summary
    date
  }
  usdSnapshot: amountSnapshot(
    order: {date: ASC}
    filters: {date: {gte: "2023-01-01"}, currency: {exact: "USD"}}
  ) {
    id
    currency
    amount
    summary
    date
  }
}
`;