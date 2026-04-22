import React, { useState, useEffect, useRef } from 'react'
import keycloak from './Keycloak'

const KeycloakProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const isRun = useRef(false)

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;

        keycloak.init({
            onLoad: 'login-required',
            checkLoginIframe: false
        })
        .then((auth) => {
            setAuthenticated(auth)
        })
        .catch(err => console.error("Keycloak init error", err));
    }, []);

    if (!authenticated) {
        return <div>Loading Authentication...</div>;
    }

    return children;
};

export default KeycloakProvider;