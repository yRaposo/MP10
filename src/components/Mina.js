import React from "react";
import { View, StyleSheet } from "react-native";

export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.corMina} />
            <View style={styles.linha} />
            <View style={[styles.linha, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.linha, { transform: [{ rotate: '90deg' }] }]} />
            <View style={[styles.linha, { transform: [{ rotate: '135deg' }] }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    corMina: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linha: {
        position: 'absolute',
        height: 3,
        width: 20,
        borderRadius: 3,
        backgroundColor: 'black',
    }
});