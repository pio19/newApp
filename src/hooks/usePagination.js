import { useState, useEffect } from 'react';
import axios from 'axios';

const usePagination = (getList, initialLimit = 10, initialOffset = 0) => {
    const [loading, setLoading] = useState();
    const [limit, setLimit] = useState(initialLimit);
    const [offset, setOffset] = useState(initialOffset);

    const fetchData = async () => {
        setLoading(true);
        const response = await getList(limit, offset);
        limit = 
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [limit, offset]);

    return (loading);
};

export default usePagination;
