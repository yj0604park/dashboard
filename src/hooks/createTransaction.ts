import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import {
  RetailerSelectionProps,
  TransactionCreationData
} from 'src/types/internal';
import {
  CreateTransactionMutation,
  CreateTransactionWithoutRetailerMutation
} from 'src/queries/BankQuery';

interface CreateTransactionProps {
  accountId: string;
}

const createTransaction = ({ accountId }: CreateTransactionProps) => {
  const [defaultTransactionCreationData, setDefaultTransactionCreationData] =
    useState<TransactionCreationData>({
      amount: null,
      date: '',
      accountId: accountId,
      isInternal: false,
      category: 'ETC',
      note: ''
    });

  const [
    useCreateTransaction,
    { error: mutationError, loading: mutationLoading }
  ] = useMutation(CreateTransactionMutation);

  const [
    useCreateTransactionWithoutRetailer,
    {
      loading: mutationWithoutRetailerLoading,
      error: mutationWithoutRetailerError
    }
  ] = useMutation(CreateTransactionWithoutRetailerMutation);

  const [transactionCreationDataList, setTransactionCreationDataList] =
    useState<TransactionCreationData[]>([
      { ...defaultTransactionCreationData, id: '1' }
    ]);

  const addNewRow = () => {
    let newDate =
      transactionCreationDataList[transactionCreationDataList.length - 1]?.date;

    let nextDataList = [
      ...transactionCreationDataList,
      {
        ...defaultTransactionCreationData,
        id: (transactionCreationDataList.length + 1).toString(),
        date: newDate
      }
    ];
    setTransactionCreationDataList(nextDataList);
  };

  const setTransactionCreationData = (id: string) => {
    return (data: TransactionCreationData) => {
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

  const onRetailerChange = (id: string) => {
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

  const onIsInternalChange = (id: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setTransactionCreationDataList(
        transactionCreationDataList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isInternal: e.target.checked,
              category: 'TRANSFER'
            };
          }
          return item;
        })
      );
    };
  };

  const submitRequest = () => {
    transactionCreationDataList.forEach((item) => {
      if (item.amount === null || item.date === '') {
        return;
      }
      let error = false;
      if (item.isInternal) {
        useCreateTransactionWithoutRetailer({
          variables: {
            accountId: item.accountId,
            amount: Number(item.amount),
            date: item.date,
            isInternal: item.isInternal,
            category: item.category,
            note: item.note
          }
        });
        if (mutationWithoutRetailerError) {
          error = true;
        }
      } else {
        useCreateTransaction({
          variables: {
            accountId: item.accountId,
            amount: Number(item.amount),
            date: item.date,
            isInternal: item.isInternal,
            category: item.category,
            note: item.note,
            retailerId: item.retailerId
          }
        }).catch((e) => {
          error = true;
        });
      }
      if (error) {
        console.log(mutationError);
        console.log(mutationWithoutRetailerError);
      }
    });
  };

  const resetTransactionCreationDataList = () => {
    setTransactionCreationDataList([
      { ...defaultTransactionCreationData, id: '1' }
    ]);
  };

  const updateDefaultTransaction = (accountId: string, date: string) => {
    if (
      accountId === defaultTransactionCreationData.accountId &&
      date === defaultTransactionCreationData.date
    ) {
      return;
    }

    setDefaultTransactionCreationData({
      ...defaultTransactionCreationData,
      accountId: accountId,
      date: date
    });

    resetTransactionCreationDataList();

    setTransactionCreationDataList([
      {
        ...defaultTransactionCreationData,
        id: '1',
        accountId: accountId,
        date: date
      }
    ]);
  };

  return {
    transactionCreationDataList,
    resetTransactionCreationDataList,
    setTransactionCreationData,
    addNewRow,
    onRetailerChange,
    onIsInternalChange,
    submitRequest,
    mutationError,
    mutationLoading,
    updateDefaultTransaction
  };
};

export default createTransaction;
