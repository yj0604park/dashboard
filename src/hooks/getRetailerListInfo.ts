import { useState } from 'react';
import { RetailerList } from 'src/types/internal';
import { useGetRetailerListQueryQuery } from 'src/__generated__/graphql';

const getRetailerListInfo = () => {
  const [retailerInfo, setRetailerInfo] = useState<RetailerList>({
    firstAdded: false,
    loadMore: false,
    nextPage: '',
    totalRetailers: []
  });

  // graphql connection
  const {
    loading: retailerLoading,
    error: retailerError,
    data,
    fetchMore
  } = useGetRetailerListQueryQuery();

  if (!retailerLoading && !retailerError) {
    if (!retailerInfo.firstAdded) {
      setRetailerInfo({
        firstAdded: true,
        loadMore: data.retailerRelay.pageInfo.hasNextPage,
        nextPage: data.retailerRelay.pageInfo.endCursor,
        totalRetailers: data.retailerRelay.edges.map((item) => {
          return {
            id: item.node.id,
            label: item.node.name,
            category: item.node.category
          };
        })
      });
    }

    if (retailerInfo.loadMore) {
      fetchMore({
        variables: {
          after: retailerInfo.nextPage
        }
      }).then((result) => {
        setRetailerInfo({
          ...retailerInfo,
          loadMore: result.data.retailerRelay.pageInfo.hasNextPage,
          nextPage: result.data.retailerRelay.pageInfo.endCursor,
          totalRetailers: [
            ...retailerInfo.totalRetailers,
            ...result.data.retailerRelay.edges.map((item) => {
              return {
                id: item.node.id,
                label: item.node.name,
                category: item.node.category
              };
            })
          ]
        });
      });
    }
  }
  return { retailerInfo, setRetailerInfo, retailerLoading, retailerError };
};

export default getRetailerListInfo;
