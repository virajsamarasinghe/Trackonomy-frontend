import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        if(username === "user" && password === "password") {
            setUser({username});
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);