"use client"
import { Models } from "node-appwrite";
import { createContext, useContext } from "react";

const defaultState = {
    isAuth: false,
    user: null,
};

const AuthContext = createContext<AuthContextType>(defaultState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, initialState }: AuthProvider) => {
    return (
        <AuthContext.Provider value={initialState}>
            {children}
        </AuthContext.Provider>
    )
};

export type AuthContextType = {
    isAuth: boolean;
    user: Models.User<Models.Preferences> | null;
}

type AuthProvider = {
    children: React.ReactNode;
    initialState: AuthContextType;
}