import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

//Constante que vai representar o estado inicial do display
const initialState ={
   displayValue: '0',//valor mostrado no display 
   clearDisplay: false,//Se precisa ou não limpar o display
   operation: null,//armazena a operação
   
   /*Array com dois valores para quando clicar em operação
   ,ele vai limpar o display e armazenar o primerios numeros
   digitados no primeiro valor , e depois da operação no segundo valor*/
   values: [0, 0],

   current: 0//se está sendo manipulado o primeiro valor(indice 0) ou o segundo valor(indice 1)
}

export default class Calculator extends Component{

  //Starta o estado, criando o clone do initialstate e colocando no state
  state = {...initialState}


    constructor(props){
        super(props)
        //this. chama a função addDigit e setOperation e clearMemory
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory(){
        this.setState({...initialState})

    }
    setOperation(operation){
        console.log(operation)

    }
    addDigit(n){
        /*Se foi digitado um ponto "." mas um ponto já tinha sido
        digitado ignora-se essa ação, impedindo a digitação de um novo ponto*/
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }
        /**O clearDisplay vai usar dois cenarios, o primeiro cenario
         * será quando o display contem apenas o digito 0, o segundo seria
         * quando a variavel clearDisplay estiver true , evitadno zeros a esquerda
         */
        const clearDisplay = this.state.displayValue === '0'
           || this.state.clearDisplay
        
         /**Valor corrente que dependerá se o display estiver limpo */ 
        const currentValue = clearDisplay ? '' : this.state.displayValue   
         //pegando o valor corrente do display
        const displayValue = currentValue + n 

        //quando cmeçã a digitar altera clearDisplay para false
        this.setState({displayValue, clearDisplay: false})

         if(n !== '.'){
             //indice do valor a ser alterado
             const i = this.state.current
             //converte para float
             const newValue = parseFloat(displayValue)
             //clona-se o valor atraves do spread
             const values = [...this.state.values]
             //coloca-se o novo valor no array
             values[i] = newValue
             this.setState({values})
             console.log(values)
         }

    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC"  click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>

        )
    }
}