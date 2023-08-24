import { Dimensions } from "react-native";

//Parametros utilizados para estilizar tamanho dos blocos
const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15,
    difficultLevel: 0.1,
    //Pegando tamanho da tela do dispositivo e dividindo pelo tamanho dos blocos pra conseguir um numero padrao de colunas
    getColumnsAmount() {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    //O mesmo que acima mas agora para linhas
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

// exportando configuração
export default params


//LEMBRETE

//COMPONENTES DE LÓGICA E ESTILIZAÇÃO PODEM SER FEITOS FORA DO COMPONENTE VISUAL