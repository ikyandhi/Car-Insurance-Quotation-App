import decode from 'jwt-decode';
import auth0 from 'auth0-js';

const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";
const REACT_APP_AUTH0_CLIENT_ID = "VfuiYoKHE7taX1Y84gfPbbcdAHhgSIdF";
const REACT_APP_AUTH0_CLIENT_DOMAIN = "ikylabsoft.auth0.com";
const REACT_APP_AUTH0_REDIRECT_URI = "http://localhost:3001/callback";
const REACT_APP_AUTH0_AUDIENCE = "https://ikylabsoft.auth0.com/api/v2/";
const REACT_APP_AUTH0_SCOPE = "openid";

var auth = new auth0.WebAuth({clientID: REACT_APP_AUTH0_CLIENT_ID, domain: REACT_APP_AUTH0_CLIENT_DOMAIN});

export function login() {
    auth.authorize({
        responseType: 'token id_token',
        redirectUri: REACT_APP_AUTH0_REDIRECT_URI,
        audience: REACT_APP_AUTH0_AUDIENCE,
        scope: REACT_APP_AUTH0_SCOPE});
}

export function logout() {
    clearIdToken();
    clearAccessToken();
    window.location.href = "/";
}

export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
    let accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
        return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}