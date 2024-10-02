import { dataProvider } from "../base/api";
import { useQuery } from '@tanstack/react-query';

export const useOne = (resource, productId) => {
    const { getOne } = dataProvider(resource);

    const { data:response , ...query } = useQuery({
        queryKey: [`get-one-${resource}`, productId],
        queryFn: () => getOne(productId),
    });

    const data = response?.data || response;
    return { data };
}
