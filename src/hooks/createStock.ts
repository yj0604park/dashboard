import { useCreateStockMutationMutation, useGetStockListQueryQuery } from 'src/__generated__/graphql';

const createStock = () => {
  const { data: stockData, loading: getStockLoading } = useGetStockListQueryQuery();

  const [createStockMutation, { data, loading, error }] = useCreateStockMutationMutation();

  return { createStockMutation, stockData, getStockLoading };
};

export default createStock;
