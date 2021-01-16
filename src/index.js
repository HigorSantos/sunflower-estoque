import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';

import './global.css';

import { initFacebookSdk} from './helpers/init-facebook-sdk';
import { jwtInterceptor } from './helpers/jwt.interceptor';
import { errorInterceptor } from './helpers/error.interceptor';

// enable interceptors for http requests
jwtInterceptor();
errorInterceptor();

// wait for facebook sdk before startup
initFacebookSdk().then(startApp);

function startApp() { 
    ReactDOM.render(<App />,document.getElementById('root'));
}

