import api from '../services/api';

import { accountService } from '../services/account';

export function errorInterceptor() {
    api.interceptors.response.use(null, (error) => {
        const { response } = error;
        if (!response) {
            // network error
            console.error(error);
            return;
        }
    
        if ([401, 403].includes(response.status)) {
            // auto logout if 401 or 403 response returned from api
            console.log("response.status", response.status);
            console.log("response.message", response.data?.message);
            accountService.erroLogin(response.status);
        }

        const errorMessage = response.data?.message || response.statusText;
        console.error('ERROR:', errorMessage);
        return response;
    });
}