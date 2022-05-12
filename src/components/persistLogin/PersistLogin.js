import { Outlet } from "react-router-dom";
import { useState, useEffect,useContext} from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import AuthContext from "../../context/AuthProvider";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();
    const { setAuth } = useContext(AuthContext);


    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken =  () => {
            
            try {
                refresh();
              
                
                
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        
        refresh() ;setIsLoading(false);
        
        setAuth(JSON.parse(localStorage.getItem('user')))
        // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
       
       
        return () => isMounted = false;
    }, [])

    useEffect(() => {
        refresh() ;setIsLoading(false);
        
        setAuth(JSON.parse(localStorage.getItem('user')))
        // console.log(`isLoading: ${isLoading}`)
        // console.log('aT',auth)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin