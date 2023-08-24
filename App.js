import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Component } from "react";

import params from "./src/Params";
import Field from "./src/components/Field";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Projeto campo minado!!!</Text>
        <Text> Tamanho da grade:
          {params.getRowsAmount()} X {params.getColumnsAmount()} </Text>

          <Field />
          <Field opened />
          <Field opened nearMines={1} />
          <Field opened nearMines={2} />
          <Field opened nearMines={3} />
          <Field opened nearMines={6} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
