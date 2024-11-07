import React, { Component } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import parametros from "./src/parametros";
import Field from "./src/components/Field";
import {
  criarTabuleiroComMinas,
  calcularAoredor,
  abrirCampo,
  marcarCampo,
  verificarVitoria
} from "./src/logicaCampoMinado";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.criarEstado();
  }

  criarEstado = () => {
    const linhas = parametros.getRowsAmount();
    const colunas = parametros.getColumnsAmount();
    const minas = Math.floor(linhas * colunas * parametros.nivelDificuldade);
    const tabuleiro = criarTabuleiroComMinas(linhas, colunas, minas);
    calcularAoredor(tabuleiro);
    return { tabuleiro, venceu: false, perdeu: false };
  };

  abrirCampo = (linha, coluna) => {
    const tabuleiro = [...this.state.tabuleiro];
    abrirCampo(tabuleiro, linha, coluna);
    const perdeu = tabuleiro[linha][coluna].explodido;
    const venceu = verificarVitoria(tabuleiro);

    if (perdeu) {
      Alert.alert("Perdeu!", "Você pisou em uma mina!");
    }

    if (venceu) {
      Alert.alert("Parabéns!", "Você venceu!");
    }

    this.setState({ tabuleiro, perdeu, venceu });
  };

  marcarCampo = (linha, coluna) => {
    const tabuleiro = [...this.state.tabuleiro];
    marcarCampo(tabuleiro, linha, coluna);
    const venceu = verificarVitoria(tabuleiro);

    if (venceu) {
      Alert.alert("Parabéns!", "Você venceu!");
    }

    this.setState({ tabuleiro, venceu });
  };

  renderCampo = (campo, linha, coluna) => {
    return (
      <Field
        key={`${linha}-${coluna}`}
        {...campo}
        onOpen={() => this.abrirCampo(linha, coluna)}
        onSelect={() => this.marcarCampo(linha, coluna)}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Campo Minado</Text>
        <Text style={styles.subtitle}>
          Tamanho do Grid: {parametros.getRowsAmount()}x{parametros.getColumnsAmount()}
        </Text>
        <View style={styles.tabuleiro}>
          {this.state.tabuleiro.map((linha, r) =>
            linha.map((campo, c) => this.renderCampo(campo, r, c))
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#f5fcff"
  },
  subtitle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#f5fcff"
  },
  tabuleiro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#AAA"
  }
});