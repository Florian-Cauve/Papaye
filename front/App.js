import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:3000/api/stuff')
      .then(res => {
        console.log("result +" + res)
      }).catch(error => {console.log("error +" + error)}) 
  }

  render() { 
    const {name} = this.state;
    return (
        <View style={styles.container}>
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
