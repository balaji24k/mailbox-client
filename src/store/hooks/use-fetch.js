import { useState } from "react";

const useFetch = (requestConfig, applyData) => {
    const [error,setError] = useState(null);

    const sendRequest = async() => {
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method : requestConfig.method ? requestConfig.method : 'GET',
                headers : requestConfig.headers ? requestConfig.headers : {},
                body : requestConfig.body ? JSON.stringify(requestConfig.body) : null
            })
            if (!response.ok) {
                throw new Error("Request Failed");
            }
            const data = await response.json();
            applyData();
        }
        catch(err) {
            setError(err || 'something went wrong')
        }
    }
    return {
        error,
        sendRequest
    }
    
};

export default useFetch;