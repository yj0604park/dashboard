import { gql } from '@apollo/client';

// Get salary data
export const GetSalaryQuery = gql`
query MyQuery {
  salaryRelay(order: {date: ASC}) {
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

export const GetSalaryFilterQuery = gql`
query MyQuery($DateMin: Date, $DateMax: Date) {
  salaryRelay(order: {date: ASC}, filters: {date: {gte: $DateMin, lte: $DateMax}}) {
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

export const SalaryYears = gql`
query MyQuery {
  salaryYears
}
`;