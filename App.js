import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Component } from "react";

import params from "./src/Params";
import Field from "./src/components/Field";
import MineField from "./src/components/MineField";
import { createMinedBoard } from "./src/functions";

export default class App extends Component {

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Projeto campo minado!!!</Text>
        <Text>
          {" "}
          Tamanho da grade:
          {params.getRowsAmount()} X {params.getColumnsAmount()}{" "}
        </Text>

        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
