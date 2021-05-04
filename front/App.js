import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  state = {
    name : ""
  }

  componentDidMount() {
    axios.get('localhost:3000/api/stuff')
      .then(res => {
        const name = res.data;
        this.setState({name});
      })
  }

  render() {
    const {name} = this.state;
    return (
        <View style={styles.container}>
          <Text style={{color: '#fff'}}>Hello Joris Bitch !!!!!</Text>
          <Text style={{color: 'red'}}>C'est moi {name} le boss mtn</Text>
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
