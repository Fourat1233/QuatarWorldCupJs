 import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh =  () => {
        //  const response = await axios.get('/refresh', {
        //     withCredentials: true
        // }); 
        const response =  JSON.parse(localStorage.getItem("user"));
     
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response);
            return {
                ...prev,
                roles: response.roles,
                accessToken: response.accessToken
            }
        });
        return response.accessToken;
    }
    return refresh;
};

export default useRefreshToken;