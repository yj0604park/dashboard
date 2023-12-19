import { gql } from '@apollo/client';

// Get salary data
export const GetSalaryQuery = gql`
  query MyQuery {
    salaryRelay(order: { date: ASC }) {
      edges {
        node {
          date
          grossPay
          id
          netPay
          totalDeduction
          totalAdjustment
          totalWithheld
          transaction {
            id
            note
          }
          payDetail
          taxDetail
          deductionDetail
          adjustmentDetail
        }
      }
      totalCount
    }
  }
`;
