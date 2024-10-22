import { useMutation } from '@tanstack/react-query';
import { createItem } from '../base/api';

export const useCreate = ({ resource }) => {
    const {} = useMutation(
        (data) => createItem(resource, data),
        {
            onSuccess: (data) => {
                console.log("Create successful:", data);
            },
            onError: (error) => {
                console.error("Error creating item:", error);
            }
        }
    );
};