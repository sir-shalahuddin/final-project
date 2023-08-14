import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import fetchUserData from "../services/User";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get("authToken") || null);
    const isLoggedIn = !!token;
    const [isPictureChange, setIsPictureChange] = useState(false);

    const login = (newUser, newToken) => {
        setUser(newUser);
        setToken(newToken);
        Cookies.set("authToken", newToken, { expires: 1 });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("authToken");
    };

    useEffect(() => {
        if (token)
            fetchUserData(token).then(user => setUser(user));
    }, [token]);

    useEffect(() => {
        if (isPictureChange) {
            fetchUserData(token).then(user => setUser(user));
            setIsPictureChange(false)
        }
    }, [isPictureChange, token]);

    return (
        <AuthContext.Provider value={{ setIsPictureChange, token, user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};