import React, { useEffect, useState } from 'react';
import { Redirect} from 'react-router-dom';
import { accountService } from '../services/account';

function Logar({ history }) {
    const [erro, setErro] = useState(null);
    document.title = "Login";
    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.accountValue) {

            history.push("/estoque");
        }
        
        accountService.errosAutentic.subscribe(x => setErro(x));
    }, [history]);
    
    async function autenticar() {
        await accountService.login();
    }
    
    return (
        <div className="login-page">
            <button className="btn btn-facebook" onClick={autenticar}>
                <i className="fa fa-facebook mr-1"></i>
                Login with Facebook
            </button>
            {erro? <h4>Erro: <em>{accountService.getMsgLogin(erro)}</em></h4> : null}
        </div>
    );
}

export { Logar };