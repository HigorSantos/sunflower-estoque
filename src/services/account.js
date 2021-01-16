import { BehaviorSubject } from 'rxjs';
import {history} from '../helpers/history';

import api from './api';

const accountSubject = new BehaviorSubject(null);
const errosAutenticSubject  = new BehaviorSubject(null);

export const accountService = {
    login,
    apiAuthenticate,
    logout,
    getMsgLogin,
    erroLogin,
    account: accountSubject.asObservable(),
    errosAutentic: errosAutenticSubject.asObservable(),
    get accountValue() { return accountSubject.value; }
};

async function login() {

    const { authResponse } = await new Promise(window.FB.login);
    console.log(authResponse)
    
    if (!authResponse) return;
    await apiAuthenticate(authResponse.accessToken);

    // get return url from location state or default to home page
    const { from } = history.location.state || { from: { pathname: "/estoque" } };

    history.push(from);
}

async function apiAuthenticate(accessToken) {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a JWT auth token
    const response = await api.post(`/login`, { accessToken });
    //console.log("apiAuthenticate", response)

    if(response && response.data?.token){
        accountSubject.next(response.data);
        startAuthenticateTimer();

        return response.data;
    }else{
        if(response){

            erroLogin(response.status);
        }
    }
}
function erroLogin(erro) {
    stopAuthenticateTimer();
    const chaveErro = getErroLogin(erro);

    accountSubject.next(null);
    errosAutenticSubject.next(chaveErro);

    history.push(`/login?erro=${chaveErro}`);
}

function getErroLogin(erro){
    const padrao = '0';
    const msg = {
        '403':'autenticacao_api_nao_cad',
        '401': 'autenticacao_api',
        '500': 'autenticacao_api',
        '0': 'autenticacao_api',
    }

    return msg[erro] || msg[padrao];
}

function getMsgLogin(erro){
    const padrao = 'autenticacao_api';
    const msg = {
        'autenticacao_api_nao_cad':'Usuário não cadastrado',
        'autenticacao_api': 'Erro durante autenticação',
    }

    return msg[erro] || msg[padrao];
}

function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
   /* window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());*/
    stopAuthenticateTimer();
    accountSubject.next(null);

    history.push('/login');
}

let authenticateTimeout;

function startAuthenticateTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(accountSubject.value.token.split('.')[1]));

    // set a timeout to re-authenticate with the api one minute before the token expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    const { accessToken } = window.FB.getAuthResponse();

    console.info("-----------------------------------")
    console.info("CHAMANDO VIA startAuthenticateTimer")
    console.info("-----------------------------------")

    authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
}

function stopAuthenticateTimer() {
    // cancel timer for re-authenticating with the api
    clearTimeout(authenticateTimeout);
}