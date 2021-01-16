import React, {Component} from 'react';
import Select from 'react-select'
import api from '../services/api';
import SelecQuantidate from '../components/SelecQuantidate'

import {withRouter} from 'react-router-dom';

import './MovimentarEstoque.css';


class MovimentarEstoque extends Component{
    state = {
        produtos:[],
        prodSelecionado:null,
        movSelecionada:{},
        qtd:0,
        qtdMin:0,
        qtdMax:9999,
        preco:0,
        ciclo:'',
        tipoMovimentacao:[],
        status:null
    };
    async componentDidMount(){
        document.title = "Movimentar Estoque";

       const response = await api.get('produtos');

       this.setState({produtos: response?.data||[]});

       const respTipoEstoque = await api.get('TipoEstoque');

       this.setState({tipoMovimentacao: respTipoEstoque?.data||[]});
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelecProdChange = prod => {
        this.setState({ prodSelecionado: prod })
    }

    handleSelecMovChange = mov => {
        const value = mov.qtdMin||0;
        const qtdMin =  mov.qtdMin||0;
        const qtdMax = mov.qtdMax||9999;

        this.setState({ movSelecionada: mov, qtdMin:qtdMin, qtdMax:qtdMax, qtd:value })
    }
    handleChangeQuantidade= value =>{
        this.setState({ qtd: value })
    }
    handleSubmit = async e => {
        e.preventDefault();
        
        await api.post('estoque', {
            codProduto: this.state.prodSelecionado.codigo,
            qtd: this.state.qtd,
            preco: this.state.preco,
            ciclo: this.state.ciclo,
            tipo: this.state.movSelecionada.codigo

        }).then(response => {
            console.log(response, "resp-estoque")

            if(response.status===201 || response.status===200){
                this.setState({
                    prodSelecionado: null,
                    qtd: 0,
                    qtdMin:0,
                    qtdMax:9999,
                    preco: 0,
                    ciclo: '',
                    movSelecionada: {},
                    status:{
                        st:'ok',
                        msg:'Adicionado!'
                    }
                })
            }else{
                this.setState({status:{
                    st:'erro',
                    msg:'Não adicionado! '+response.data.message
                }
                })
            }
        })
        .catch(erro => {
            this.setState({status:{
                st:'erro',
                msg:'Não adicionado! '+erro
            }
            })
        });
        
    }

    render(){
        return (
            <div className="main-section" id="nova-movimentacao">
                <form id="nova-movimentacao">
                    <div className="grupo-input">
                        <label htmlFor="seleciona-produto">Produto:</label>
                        <Select
                            name="seleciona-produto"
                            className="selecao"
                            placeholder="Selecione o Produto"
                            value={this.state.prodSelecionado||''}
                            options={this.state.produtos}
                            onChange={this.handleSelecProdChange}
                            getOptionLabel={(option)=>`${option.nome.toUpperCase()} (${option.codigo})`}
                            getOptionValue={(option)=>option.codigo}/>
                    </div>
                    <div className="grupo-input">
                        <label htmlFor="seleciona-movimentacao">Movimentação:</label>
                        <Select
                            name="selecao-movimentacao"
                            className="selecao"
                            placeholder="Selecione a Movimentacao"
                            value={this.state.movSelecionada||''}
                            options={this.state.tipoMovimentacao}
                            onChange={this.handleSelecMovChange}
                            getOptionLabel={(option)=>option.tipo}
                            getOptionValue={(option)=>option.codigo} />
                    </div>
                    <div className="grupo-input">
                        <label htmlFor="ciclo">Ciclo:</label>
                        <input type="text"
                                name="ciclo"
                                placeholder="Ciclo"
                                onChange={this.handleChange}
                                value={this.state.ciclo}/>
                    </div>
                    <div className="grupo-input">
                        {/* TODO Transformar em campo de preço */}
                        <label htmlFor="preco">Preço:</label>
                        <input type="number"
                                name="preco"
                                placeholder="Preço (se alterado ou venda)"
                                onChange={this.handleChange}
                                value={this.state.preco}/>

                    </div>
                    <div className="grupo-input">
                        {/* TODO Transformar em campo seleção de quantidade */}
                        <label htmlFor="qtd">Quantidade:</label>
                        <SelecQuantidate
                            min={this.state.qtdMin||0}
                            max={this.state.qtdMax||9999}
                            onChange={this.handleChangeQuantidade}/>
                    </div>
                    <button onClick={this.handleSubmit}>Lançar Movimentação</button>

                    <span>{this.state.status!=null ? <span className={`status-${this.state.status.st}`}>{this.state.status.msg}</span>:''}</span>
                </form>
            </div>
        );
    }
}
export default withRouter(MovimentarEstoque);