import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { StockData } from 'src/types/bank';
import { StockListInfo } from 'src/types/internal';
import { GetStockListQuery } from 'src/queries/StockQuery';

const getStockListInfo = () => {
  const [stockListInfo, setStockListInfo] = useState<StockListInfo>({
    firstAdded: false,
    loadMore: false,
    nextPage: '',
    totalStocks: []
  });

  const {
    loading: stockLoading,
    error: stockError,
    data,
    fetchMore
  } = useQuery<StockData>(GetStockListQuery);

  if (!stockLoading && !stockError) {
    if (!stockListInfo.firstAdded) {
      setStockListInfo({
        firstAdded: true,
        loadMore: data.stockRelay.pageInfo.hasNextPage,
        nextPage: data.stockRelay.pageInfo.endCursor,
        totalStocks: data.stockRelay.edges.map((item) => {
          return {
            id: item.node.id,
            name: item.node.name,
            ticker: item.node.ticker
          };
        })
      });
    }

    if (stockListInfo.loadMore) {
      fetchMore({
        variables: {
          After: stockListInfo.nextPage
        }
      }).then((result) => {
        setStockListInfo({
          ...stockListInfo,
          loadMore: result.data.stockRelay.pageInfo.hasNextPage,
          nextPage: result.data.stockRelay.pageInfo.endCursor,
          totalStocks: [
            ...stockListInfo.totalStocks,
            ...result.data.stockRelay.edges.map((item) => {
              return {
                id: item.node.id,
                name: item.node.name,
                ticker: item.node.ticker
              };
            })
          ]
        });
      });
    }
  }
  return { stockListInfo, setStockListInfo, stockLoading, stockError };
};

export default getStockListInfo;
