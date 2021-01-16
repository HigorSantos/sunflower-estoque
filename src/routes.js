import React from 'react';
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';

import AdicionarProduto from './pages/AdicionarProduto';
import Estoque from './pages/Estoque';
import DetalheEstoque from './pages/DetalheEstoque';
import MovimentarEstoque from './pages/MovimentarEstoque';

import {Logar} from './pages/Logar'
import {PrivateRoute} from './PrivateRoute';

function Routes() {
    const pathname = useLocation().pathname || '';

    return(
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            
            <PrivateRoute path="/" exact component={Estoque} />
            <PrivateRoute path="/adicionarproduto" exact component={AdicionarProduto}/>
            <PrivateRoute path="/estoque" exact component={Estoque}/>
            <PrivateRoute path="/detalheestoque/:codProduto" exact component={DetalheEstoque}/>
            <PrivateRoute path="/movimentar" exact component={MovimentarEstoque}/>

            <Route path="/login" component={Logar} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}
export default Routes;