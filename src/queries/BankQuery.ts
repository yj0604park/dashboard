import { gql } from '@apollo/client';

export const GetBanksQuery = gql`
query MyQuery {
  banks {
    balance
    id
    name
    accountSet {
      amount
      currency
      id
      lastUpdate
      name
    }
  }
}
`;
