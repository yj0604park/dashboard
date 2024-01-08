import { set } from 'date-fns';
import { useState } from 'react';
import { Stock, StockTransaction } from 'src/models/bank';
import { StockTransactionData } from 'src/models/internal';

const createStockTransaction = ({ accountId }) => {
  // 생성할 데이터를 저장할 list
  const [stockTransactionDataList, setStockTransactionDataList] = useState<
    StockTransactionData[]
  >([
    {
      id: 1,
      date: '',
      stock: { id: 0, name: '', ticker: '' },
      share: 0,
      price: 0,
      total: 0,
      note: ''
    }
  ]);

  const setStockTransactionData = (id: number) => {
    return (data: StockTransactionData) => {
      setStockTransactionDataList(
        stockTransactionDataList.map((item) => {
          if (data.id === id) {
            return data;
          }
          return item;
        })
      );
    };
  };

  // 새로운 row를 추가. 기존의 마지막 row의 date를 가져와서 새로운 row의 date로 설정
  const addNewRow = () => {
    let newDate =
      stockTransactionDataList[stockTransactionDataList.length - 1]?.date;

    let nextDataList = [
      ...stockTransactionDataList,
      {
        id: stockTransactionDataList.length + 1,
        date: newDate,
        stock: { id: 0, name: '', ticker: '' },
        share: 0,
        price: 0,
        total: 0,
        note: ''
      }
    ];
    setStockTransactionDataList(nextDataList);
  };

  const submitRequest = () => {
    stockTransactionDataList.forEach((item) => {
      console.log(item);
    });
  };

  //   if (item.amount === '' || item.date === '') {
  //     return;
  //   }
  //   let error = false;
  //   if (item.isInternal) {
  //     useCreateTransactionWithoutRetailer({
  //       variables: {
  //         accountId: item.accountId,
  //         amount: Number(item.amount),
  //         date: item.date,
  //         isInternal: item.isInternal,
  //         category: item.category,
  //         note: item.note
  //       }
  //     });
  //     if (mutationWithoutRetailerError) {
  //       error = true;
  //     }
  //   } else {
  //     useCreateTransaction({
  //       variables: {
  //         accountId: item.accountId,
  //         amount: Number(item.amount),
  //         date: item.date,
  //         isInternal: item.isInternal,
  //         category: item.category,
  //         note: item.note,
  //         retailerId: item.retailerId
  //       }
  //     }).catch((e) => {
  //       error = true;
  //     });
  //   }
  //   if (error) {
  //     console.log(mutationError);
  //     console.log(mutationWithoutRetailerError);
  //   }
  // });

  return {
    stockTransactionDataList,
    setStockTransactionDataList,
    setStockTransactionData,
    addNewRow,
    submitRequest
  };
};

export default createStockTransaction;
