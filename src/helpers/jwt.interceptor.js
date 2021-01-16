import api from '../services/api';

import { accountService } from '../services/account';

export function jwtInterceptor() {
    api.interceptors.request.use(request => {
        //adiciona header de autenticacao pra todas as chamadas com usuario logado (somente para api)
        const account = accountService.accountValue;
        //console.log("interc",account)
        const isLoggedIn = account?.token;
        const isApiUrl = request.baseURL.startsWith(process.env.REACT_APP_URL_API);

        if (isLoggedIn && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${account.token}`;
        }

        return request;
    });
}