import React, {Component} from 'react';
import api from '../services/api';

import './DetalheEstoque.css';

class DetalheEstoque extends Component{
    state = {
        listaEstoque:[],
        produto:{},
        estoqueConsolidado:{},
        status:""
    };
    async componentWillMount(){
        document.title = "Histórico do Produto";

       const codProduto = this.props.match.params.codProduto;

        if(!codProduto){
            this.props.history.push("/estoque"); 
        }

        await api.get(`estoque/produto/${codProduto}`) 
        .then(response=>{
            this.setState({ listaEstoque: response?.data || [] });

        })
        .catch(err=>{
            if(err && err.data){
                this.setState({status:err.status + " " + err.data.statusText})
            }else{
 
                this.setState({status: " " + err})
            }
        });;

        await api.get(`produto/${codProduto}`)
        .then(respProd=>{
            this.setState({ produto: respProd?.data || {} });
        })
        .catch(err=>{
            if(err && err.data){
                this.setState({status:err.status + " " + err.data.statusText})
            }else{
                this.setState({status: " " + err})
            }
        });

        await api.get(`estoque/produto/${codProduto}/consolidado`)
        .then(respConsolidado=>{
            this.setState({estoqueConsolidado: respConsolidado?.data[0] || {}})
        })
        .catch(err=>{
            if(err && err.data){
                this.setState({status:err.status + " " + err.data.statusText})
            }else{
                this.setState({status: " " + err})
            }
        });
    }

    render(){
        const fmtCurrency = new Intl.NumberFormat('pt-BR',{ style: 'currency', currency:'BRL'})
        const fmtDataCompleta = new Intl.DateTimeFormat('default', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
        const fmtDataCompacta = new Intl.DateTimeFormat('default', {
            year: 'numeric', month: 'numeric', day: 'numeric'});     

        return (
            <section className="main-section">
                <div id="prod-det">
                    <h3>{this.state.produto.nome} <span className="prod-codigo">({this.state.produto.codigo})</span></h3>
                    <h4 className="prod-preco">Último Preço: <em>{fmtCurrency.format(this.state.produto.preco)}</em></h4>
                    <h4>Quantidade em Estoque: <em>{this.state.estoqueConsolidado.estoque}</em></h4>
                </div>

                <div id="prod-log-estoque">
                    {this.state.listaEstoque.map(log=>
                        <article className={`tipo-estoque-${log.tipo.simples}`} key={log._id}>
                            <span className="log-tipo">{log.tipo.tipo}</span>
                            <span title={fmtDataCompleta.format(new Date(log.createdAt))}>{fmtDataCompacta.format(new Date(log.createdAt))}</span>
                            <span className="log-qtd">Qtd: {log.qtd}</span>
                            <span className="log-preco">{fmtCurrency.format(log.preco)}</span>
                        </article>
                    )}

                </div>
            </section>
        );
    }
}
export default DetalheEstoque;