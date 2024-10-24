import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const activeHttpRequests = useRef([]);
    
    const sendRequest = useCallback(async (url,method = 'GET', body = null, headers={}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try{
            const response = await fetch(url, {
                method,
                body,
                headers
            });
    
            const responseData = await response.json();

            // activeHttpRequests.current = activeHttpRequests.current.filter(
            //     reqCtrl => reqCtrl!==httpAbortCtrl
            // );
            setIsLoading(false);
            console.log(responseData);
            if(!response.ok){
                throw new Error(responseData.message);
            }
            return responseData;
        }
        catch(err){
            setError(err.message);
            throw err;
        }
        
    },[]) ;

    const clearError = () => {
        setError(null);
    }; 

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {isLoading, error, sendRequest};
};