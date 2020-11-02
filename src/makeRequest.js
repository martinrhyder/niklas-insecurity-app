import axios from 'axios'

export const requestModule = () => {
    const axiosInstance = axios.create();
    const makeRequest = ({ method }) => ({ url, data }) =>  
        axiosInstance({
            method,
            url,
            data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    
    return {
        get: makeRequest({ method: 'get'}),
        post: makeRequest({ method: 'post'})
    }
}

export default requestModule()