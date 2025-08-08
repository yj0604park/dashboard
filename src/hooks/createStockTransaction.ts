import { useMutation } from '@apollo/client';
import { set } from 'date-fns';
import { useState } from 'react';
import { Stock } from 'src/types/internal';
import { StockTransactionData } from 'src/types/internal';
import {
  CreateStockTransactionMutation,
  CreateTransactionMutation,
  CreateTransactionWithoutRetailerMutation
} from 'src/queries/BankQuery';

const createStockTransaction = ({ accountId }) => {
  const defaultValue = {
    id: 1,
    date: '',
    stock: { id: 0, name: '', ticker: '' },
    shares: null,
    price: 0,
    total: 0,
    note: ''
  };
  // 생성할 데이터를 저장할 list
  const [stockTransactionDataList, setStockTransactionDataList] = useState<
    StockTransactionData[]
  >([defaultValue]);

  // 생성 mutation
  const [useStockCreate] = useMutation(CreateStockTransactionMutation);
  const [useTransactionCreate] = useMutation(
    CreateTransactionWithoutRetailerMutation
  );

  const setStockTransactionData = (id: number) => {
    return (data: StockTransactionData) => {
      setStockTransactionDataList(
        stockTransactionDataList.map((item) => {
          if (item.id === id) {
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
        ...defaultValue,
        id: stockTransactionDataList.length + 1,
        date: newDate
      }
    ];
    setStockTransactionDataList(nextDataList);
  };

  const submitRequest = () => {
    stockTransactionDataList.forEach((item) => {
      useTransactionCreate({
        variables: {
          accountId: accountId,
          amount: -item.total,
          date: item.date,
          isInternal: false,
          category: 'STOCK',
          note:
            item.stock.ticker +
            ' price: ' +
            item.price +
            ' shares: ' +
            item.shares
        }
      }).then((result) => {
        // item.id = result.data.createTransaction.id;
        useStockCreate({
          variables: {
            accountId: accountId,
            date: item.date,
            stockId: item.stock.id,
            shares: item.shares,
            price: item.price,
            amount: item.total,
            note: item.note,
            transactionId: result.data.createTransaction.id
          }
        });
      });
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
