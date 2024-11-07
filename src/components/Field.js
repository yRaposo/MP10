import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Parametros from "../parametros";
import Mina from "./Mina";
import Bandeira from "./Bandeira";

export default props => {
  const { mina: minado, aberto, aoredor, explodido, bandeirado, onOpen, onSelect } = props;

  const styleField = [styles.field];
  if (aberto) styleField.push(styles.aberto);
  if (explodido) styleField.push(styles.explosao);
  if (bandeirado) styleField.push(styles.bandeirado);
  if (!aberto && !explodido) styleField.push(styles.regular);

  if (styleField.length === 1) {
    styleField.push(styles.regular);
  }

  let color = null;
  if (aoredor > 0) {
    if (aoredor === 1) color = '#2A28D7';
    if (aoredor === 2) color = '#2B520F';
    if (aoredor > 2 && aoredor < 6) color = '#F9060A';
    if (aoredor >= 6) color = '#F221A9';
  }

  return (
    <TouchableWithoutFeedback onPress={onOpen} onLongPress={onSelect}>
      <View style={styleField}>
        {!minado && aberto && aoredor > 0 ?
          <Text style={[styles.label, { color: color }]}>
            {aoredor}
          </Text> : false}
        {minado && (explodido || aberto)  ? <Mina /> : false}
        {bandeirado && !aberto ? <Bandeira /> : false}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  field: {
    height: Parametros.blocoSize,
    width: Parametros.blocoSize,
    borderWidth: Parametros.bordaSize,
    alignItems: 'center',
    justifyContent: 'center'
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#ccc',
    borderTopColor: '#ccc',
    borderRightColor: '#333',
    borderBottomColor: '#333'
  },
  aberto: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontWeight: 'bold',
    fontSize: Parametros.fonteSize,
  },
  explosao: {
    backgroundColor: 'red',
    borderColor: 'red'
  },
});