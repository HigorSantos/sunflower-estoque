import React, {Component} from 'react';
import './SelecQuantidate.css';

class SelecQuantidate extends Component {
    state = {
        value: 0,
        min: 0,
        max: 9999
    }
    componentDidMount(){

        this.setState({
            min: this.props.min,
            max: this.props.max,
            value: this.props.min
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.min !== this.props.min) {
            this.setState({
                min: this.props.min,
                value: this.props.min
            });
        }
        if(prevProps.max !== this.props.max) {
            this.setState({
                max: this.props.max
            });
        }
      }
    increment = (e) => {
        e.preventDefault();
        let {value, max} = this.state;
        const valorNovo = value < max ? ++value : value;
        this.setState({
            value: valorNovo
        });
        this.props.onChange(valorNovo);
    }

    decrement = (e) => {
        e.preventDefault();
        let {value, min} = this.state;
        const valorNovo = value > min? --value : min
        this.setState({
            value: valorNovo
        });
        this.props.onChange(valorNovo);
    }

    render() {
        return (
        <div className="quantidade-input">
            <button 
                className="quantity-input-btn"
                onClick={this.decrement}>
                &mdash;
            </button>
            <input className="quantity-input-inp"
                    type="text"
                    value={this.state.value}
                    readOnly
                    />
            <button 
                    className="quantity-input-btn" 
                    onClick={this.increment}>
                &#xff0b;
            </button>  
        </div>
        );
    }
}

export default SelecQuantidate;