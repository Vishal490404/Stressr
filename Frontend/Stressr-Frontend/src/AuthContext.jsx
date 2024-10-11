import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('auth_token')); 
    const login = (token) => {
        Cookies.set('auth_token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove('auth_token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node
}


