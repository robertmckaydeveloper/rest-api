import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://keycloak:8081',
    realm: 'dev',
    clientId: 'react-app',
});

window.keycloak = keycloak;

export default keycloak;