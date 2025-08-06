import { BankNode } from "src/types/bank";
import { Decimal } from "decimal.js";

export default class Util {
  static FormatString(amount: string | number, currency: string) {
    let sign = '₩';
    let digit = 0;
    if (currency == "KRW") {
      sign = '₩';
      digit = 0;
    }
    else if (currency == "USD") {
      sign = '$';
      digit = 2;
    }

    // Handle null/undefined values
    if (amount == null || amount === undefined || amount === '') {
      return sign + ' 0' + (digit > 0 ? '.' + '0'.repeat(digit) : '');
    }

    // Use Decimal for precision-safe calculations
    const decimal = new Decimal(amount);
    const numAmount = decimal.toNumber();

    if (decimal.isNegative()) {
      return (
        '-' +
        sign +
        ' ' +
        decimal.abs().toNumber().toLocaleString('ko-KR', {
          minimumFractionDigits: digit
        })
      );
    } else {
      return (
        sign +
        ' ' +
        numAmount.toLocaleString('ko-KR', {
          minimumFractionDigits: digit
        })
      );
    }
  }

  static GetTotalNumber(bankList: BankNode[], currency: string): string {
    let sum = new Decimal(0);
    bankList.forEach((element) => {
      element.node.balance.forEach((balance_per_currency) => {
        if (balance_per_currency.currency === currency) {
          // Use Decimal for precision-safe addition
          sum = sum.plus(new Decimal(balance_per_currency.value));
        }
      });
    });
    return sum.toString(); // Return as string to maintain precision
  }

}