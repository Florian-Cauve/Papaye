import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Text style={{color: '#fff'}}>Hello !!!!!</Text>
          <StatusBar style="auto"/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6699ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
