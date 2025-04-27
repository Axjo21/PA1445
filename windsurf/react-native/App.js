import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import Board from './src/components/Board';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>React Native Chess</Text>
      <Board />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 12,
  },
});
