import { useEffect, useState } from "react";
import { dataProvider } from "../base/api";
import { useQuery } from '@tanstack/react-query';

export const useList = ({ resource, options }) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
    const { getList } = dataProvider(resource);
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     getList(pageSize, page).then(res => {
    //         setData(res);
    //     })
    // }, [pageSize, page])
    const { data = [], refetch, ...query } = useQuery({
        queryKey: 'products',
        page, pageSize, 
        queryFn: () => getList(pageSize, page)
    });

    const onPagination = (page, pageSize) => {
        setPageSize(pageSize * page)
        setPage((page > 0 ? page - 1 : page) * pageSize);
    }


    return { data, onPagination};
}