import React, { useState, useEffect, useContext, useRef, createContext } from 'react'
import keycloak from './keycloak'

const AuthContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const isRun = useRef(false)

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;

        keycloak.init({
            onLoad: 'check-sso',
            checkLoginIframe: false,
            pkceMethod: 'S256'
        })
        .then((auth) => {
            setAuthenticated(auth);
            setLoading(false);
        })
        .catch(err => {
            console.error("Keycloak init error", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading Authentication...</div>;
    }

    return (
        <AuthContext.Provider value={{ authenticated, keycloak }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a KeycloakProvider")
    }
    return context;
};
