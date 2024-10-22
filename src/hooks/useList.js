import { useEffect, useState } from "react";
import { dataProvider } from "../base/api";
import { useQuery } from '@tanstack/react-query';

export const useList = ({ resource, options, onSearch }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
    const [search, setSearch] = useState("");
    const { getList } = dataProvider(resource);
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     getList(pageSize, page).then(res => {
    //         setData(res);
    //     })
    // }, [pageSize, page])
    const { data = [], refetch, ...query } = useQuery({
        queryKey: [`${resource}`, page, pageSize, search],
        queryFn: () => getList(pageSize, (page - 1) * pageSize, search),

    });

    const onPagination = (page, pageSize) => {
        setPageSize(pageSize)
        setPage(page);
    }


    const handleSearch = (searchValues) => {
        console.log(searchValues);
        
        setSearch(searchValues);
        setPage(1);
    };



    // const onPagination = (page, pageSize) => {
    //     setPageSize(pageSize * page)
    //     setPage((page > 0 ? page - 1 : page) * pageSize);
    // }

    return { data, onPagination, handleSearch, refetch, ...query };
}
