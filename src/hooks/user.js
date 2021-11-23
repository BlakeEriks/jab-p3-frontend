import useHttp from "../http";
import { useAuthState } from "./auth";

const useUserActions = () => {
    
    const http = useHttp()
    const [auth, setAuth] = useAuthState()
    const API_BASE_URL = process.env.REACT_APP_API_URL
    
    const login = ({ username, password }) => {
        return http.post(`${API_BASE_URL}/authenticate`, {username, password})
            .then( data => {
                localStorage.setItem('token', JSON.stringify(data));
                setAuth(data)
            })
    }

    const register = ({ username, password }) => {
        return http.post(`${API_BASE_URL}/register`, { username, password })
            .then( data => {
                localStorage.setItem('auth', JSON.stringify(data));
                setAuth(data)
            })
    }

    const logout = () => {
        localStorage.removeItem('auth');
        setAuth(null)
    }

    return {
        login,
        logout,
        register
    }
}

export default useUserActions