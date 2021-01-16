import React, {Component} from 'react';

import './Footer.css';


class Header extends Component{

    render(){
        return (
            <footer id="main-footer">
                <p>Todos os direitos reservados. <a href="https://github.com/HigorSantos">Higor Santos</a></p>
                <div id="creditos">
                    <h5>Créditos: </h5>
                    <span>Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon"> www.flaticon.com</a></span>
                </div>
            </footer>
        );
    }
}
export default Header;
