import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState(()=>{
        return localStorage.clear('token');
    });

    const setToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
};