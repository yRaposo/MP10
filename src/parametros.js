import { Dimensions } from "react-native";

const parametros = {
    blocoSize: 30,
    bordaSize: 5,
    fonteSize: 15,   
    painelSize: 0.15, // Proporção do painel da tela 15%
    nivelDificuldade: 0.1, // 10% da tela com minas
    
    getColumnsAmount() {
        const width = Dimensions.get('window').width;
        return Math.floor(width / this.blocoSize);
    },

    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height;
        const bordaHeight = totalHeight * (1 - this.painelSize);
        return Math.floor(bordaHeight / this.blocoSize);
    }
}

export default parametros;