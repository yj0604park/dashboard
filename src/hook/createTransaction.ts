import { ChangeEvent, useState } from 'react';
import {
  RetailerSelectionProps,
  TransactionCreationData
} from 'src/models/internal';

interface CreateTransactionProps {
  accountId: number;
}

const createTransaction = ({ accountId }: CreateTransactionProps) => {
  // form information
  const DefaultTransactionCreationData: TransactionCreationData = {
    amount: '',
    date: '',
    accountId: accountId,
    isInternal: false,
    category: 'ETC',
    note: ''
  };

  const [transactionCreationDataList, setTransactionCreationDataList] =
    useState<TransactionCreationData[]>([
      { ...DefaultTransactionCreationData, id: 1 }
    ]);

  const addNewRow = () => {
    setTransactionCreationDataList([
      ...transactionCreationDataList,
      {
        ...DefaultTransactionCreationData,
        id: transactionCreationDataList.length + 1
      }
    ]);
  };

  const setTransactionCreationData = (id: number) => {
    return (data: TransactionCreationData) => {
      console.log(id);
      console.log(data);

      setTransactionCreationDataList(
        transactionCreationDataList.map((item) => {
          if (item.id === id) {
            return data;
          }
          return item;
        })
      );
    };
  };

  const onRetailerChange = (id: number) => {
    return (
      e: ChangeEvent<HTMLInputElement>,
      value: RetailerSelectionProps
    ) => {
      setTransactionCreationDataList(
        transactionCreationDataList.map((item) => {
          if (item.id === id) {
            if (!value) {
              return {
                ...item,
                category: 'ETC',
                retailerId: undefined
              };
            } else {
              return {
                ...item,
                category: value.category,
                retailerId: value.id
              };
            }
          }
          return item;
        })
      );
    };
  };

  const submitRequest = () => {
    console.log(transactionCreationDataList);
  };

  return {
    transactionCreationDataList,
    setTransactionCreationDataList,
    addNewRow,
    setTransactionCreationData,
    onRetailerChange,
    submitRequest
  };
};

export default createTransaction;
