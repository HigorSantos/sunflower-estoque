import React, {Component} from 'react';
import api from '../services/api';

import {withRouter} from 'react-router-dom';

import './AdicionarProduto.css';


class AdicionarProduto extends Component{
    state = {
        codigo:'',
        nome:'',
        preco:0,
        status:null
    };
    async componentDidMount(){
       document.title = "Adicionar Produto";
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e=> {
        e.preventDefault();

        const prod = await api.post('produtos', {
            codigo: this.state.codigo,
            nome: this.state.nome,
            preco: this.state.preco
        })

        if(prod.status===200){
            this.setState({
                codigo:'',
                nome:'',
                preco:'',
                status:{
                    st:'ok',
                    msg:'Lançado!'
                }
            })
        }else{
            this.setState({status:{
                st:'erro',
                msg:'Não Lançado!'
            }
        })
        }
    }

    render(){
        return (
            <section className="main-section">
            <form id="novo-produto" onSubmit={this.handleSubmit}>
                <div className="grupo-input">
                    <label htmlFor="codigo">Código:</label>
                    <input type="text"
                        name="codigo"
                        placeholder="Código do Produto na revista"
                        onChange={this.handleChange}
                        value={this.state.codigo}/>
                </div>
                <div className="grupo-input">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text"
                        name="nome"
                        placeholder="Nome do Produto"
                        onChange={this.handleChange}
                        value={this.state.nome}/>
                </div>
                <div className="grupo-input">
                    {/* TODO Transformar em campo de preço */}
                    <label htmlFor="preco">Preço:</label>
                    <input type="number"
                        name="preco"
                        placeholder="Preço do Produto"
                        onChange={this.handleChange}
                        value={this.state.preco}/>
                </div>
                <button className="btn-add">Adicionar Produto</button>

                <span>{this.state.status!=null ? <span className={`status-${this.state.status.st}`}>{this.state.status.msg}</span>:''}</span>
            </form>
            </section>
        );
    }
}
export default withRouter(AdicionarProduto);