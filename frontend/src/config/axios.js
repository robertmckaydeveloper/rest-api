import axios from 'axios'
import keycloak from './Keycloak'

const api = axios.create({
    baseURL: 'http://localhost:8080'
})