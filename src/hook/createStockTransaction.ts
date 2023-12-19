import { useState } from 'react';

const createStockTransaction = ({ accountId }) => {
  // 생성할 데이터를 저장할 list
  const [stockTransactionDataList, setStockTransactionDataList] = useState([]);

  // 새로운 row를 추가. 기존의 마지막 row의 date를 가져와서 새로운 row의 date로 설정
  const addNewRow = () => {
    let newDate =
      stockTransactionDataList[stockTransactionDataList.length - 1]?.date;

    let nextDataList = [
      ...stockTransactionDataList,
      {
        id: stockTransactionDataList.length + 1,
        date: newDate
      }
    ];
    setStockTransactionDataList(nextDataList);
  };

  return {
    stockTransactionDataList,
    setStockTransactionDataList,
    addNewRow
  };
};

export default createStockTransaction;
