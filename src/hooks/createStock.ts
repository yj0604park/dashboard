import { useMutation, useQuery } from '@apollo/client';
import { StockData } from 'src/models/bank';
import { CreateStockMutation, GetStockListQuery } from 'src/queries/StockQuery';

const createStock = () => {
  const { data: stockData, loading: getStockLoading } =
    useQuery<StockData>(GetStockListQuery);

  const [createStockMutation, { data, loading, error }] =
    useMutation(CreateStockMutation);

  return { createStockMutation, stockData, getStockLoading };
};

export default createStock;
