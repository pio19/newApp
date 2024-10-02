import { useState } from 'react';

const useDelete = (deleteFunction) => {
    const [loading, setLoading] = useState(false);

    const deleteRowsById = async (ids) => {
        await Promise.all(ids.map(id => deleteFunction(id)));
        alert('Xóa thành công');    
    };

    return {
        deleteRowsById
    };
}
export default useDelete;
