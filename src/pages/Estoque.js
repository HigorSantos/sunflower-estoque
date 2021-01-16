import React, {Component} from 'react';
import api from '../services/api';

import './Estoque.css';

import iconDetalhes from '../assets/detalhe.svg'
import { Link } from 'react-router-dom';

class Estoque extends Component{
    state = {
        produtos:[],
        busca:'',
        status:''
    };
    async componentDidMount(){
        document.title = "Estoque Atual";

       await api.get('produtos/estoque')
       .then(response => {
           this.setState({ produtos: response.data })
       })
       .catch(err=>{
           if(err && err.data){
               this.setState({status:err.status + " " + err.data.statusText})
           }else{
               this.setState({status: " " + err})
           }
       });

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
     }

    render(){
        const fmtCurrency = new Intl.NumberFormat('pt-BR',{ style: 'currency', currency:'BRL'})
        
        const termo = this.state.busca;
        let filtrados = null;

        if(termo.length>=4){
            filtrados = 
                this.state.produtos.filter(prod => {
                    console.log(prod['_id']['nome'].toLowerCase())
                    return prod['_id']['nome'].toLowerCase().includes(termo.toLowerCase())
                            || prod['_id']['codigo'] === termo
            })
            
        }

        const produtos = (filtrados && filtrados.length>0 ? filtrados : null) 
                        || this.state.produtos;
        
        return (
            <section id="lista-estoque" className="main-section">
                <input 
                    className="busca-produto"
                    type="text" 
                    name="busca"
                    placeholder="Buscar Produto"
                    onChange={this.handleChange}
                    value={this.state.busca}/>
                <span>{this.state.status}</span>
                {!produtos ? null : produtos.map(produto => 
                    <article key={produto._id.codigo}>
                        <div className="prod-info">
                            <span className="prod-name">{produto._id.nome} <span className="prod-codigo">({produto._id.codigo})</span></span>
                            <div className="prod-info-det">
                                <span className="prod-preco">Preço: <em>{fmtCurrency.format(produto._id.preco)}</em></span>
                                <span className="prod-qtd">Qtd: <em>{produto.estoque}</em></span>
                            </div>
                        </div>
                        <div className="prod-acoes">
                            <Link to={`/detalheestoque/${produto._id.codigo}`}>
                                <img src={iconDetalhes} alt="Ver Todas as movimentações" title="Ver Todas as movimentações" />
                            </Link>
                        </div>
                    </article>
                )}
            </section>
        );
    }
}
export default Estoque;