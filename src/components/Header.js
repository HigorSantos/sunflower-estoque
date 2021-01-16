import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './Header.css';
import movimentarIcon from '../assets/adicionar-ao-carrinho.svg';
import addIcon from '../assets/add-produto.svg';
import estoqueIcon from '../assets/lista-de-controle.svg';

import { accountService } from '../services/account';

function Header() {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        accountService.account.subscribe(x => setAccount(x));
    }, []);

    return (
        <header id="main-header">
            <div className="header-content">
                <Link to="/"><h2 id="header-logo">Sunflower - Estoque</h2></Link>
                {account ? 
                <div className="header-icons">
                    <Link to="/adicionarProduto"><img src={addIcon} alt="Adicionar Produto" title="Adicionar Produto"/></Link>
                    <Link to="/estoque"><img src={estoqueIcon} alt="Ver Estoque" title="Ver Estoque"/></Link>
                    <Link to="/movimentar"><img src={movimentarIcon} alt="Movimentar Estoque" title="Movimentar Estoque"/></Link>
                </div>
                : null}
            </div>
        </header>
    );
    
}
export default Header;