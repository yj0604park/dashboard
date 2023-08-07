import { Bank } from "src/models/bank";

export default class Util {
  static FormatString(amount: number, currency: string) {
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
    
    amount = amount ?? 0;
    if (amount < 0) {
      return (
        '-' +
        sign +
        ' ' +
        (-amount).toLocaleString('ko-KR', {
          minimumFractionDigits: digit
        })
      );
    } else {
      return (
        sign +
        ' ' +
        amount.toLocaleString('ko-KR', {
          minimumFractionDigits: digit
        })
      );
    }
  }
  
  static GetTotalNumber(bankList: Bank[], currency: string) {
    let sum = 0.0;
    bankList.forEach((element) => {
      if (currency in element['balance']) {
        sum += element['balance'][currency];
      }
    });
    return sum;
  }

}