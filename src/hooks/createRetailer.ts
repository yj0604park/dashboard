import {
  useCreateRetailerMutationMutation,
  useGetRetailerTypeQueryQuery,
  useGetTransactionCategoryQueryQuery
} from 'src/__generated__/graphql';

interface EnumInputType {
  __type: {
    enumValues: { name: string }[];
  };
}

interface EnumList {
  id: string;
  label: string;
}

const createRetailer = () => {
  const { data: transactionCategoryData, loading: transactionCategoryLoading } =
    useGetTransactionCategoryQueryQuery();
  const { data: retailerTypeData, loading: retailerTypeLoading } =
    useGetRetailerTypeQueryQuery();

  const [
    createRetailerMutation,
    {
      loading: retailerMutationLoading,
      error: retailerMutationError,
      data: retailerData
    }
  ] = useCreateRetailerMutationMutation();

  const convertEnumToArray = (enumData: EnumInputType) => {
    let result: EnumList[] = [];
    if (enumData === undefined) return result;

    for (let item in enumData['__type']['enumValues']) {
      let value = enumData['__type']['enumValues'][item];
      result.push({ id: item, label: value['name'] });
    }
    return result;
  };

  return {
    createRetailerMutation,
    retailerMutationLoading,
    retailerMutationError,
    retailerData,
    transactionCategoryData,
    transactionCategoryLoading,
    retailerTypeData,
    retailerTypeLoading,
    convertEnumToArray
  };
};

export default createRetailer;
