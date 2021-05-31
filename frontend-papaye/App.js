import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  state = {
    name : ""
  }

  componentDidMount() {
    axios.get('http://localhost:8082/api/users/test')
      .then(res => {
        console.log(res);
        const name = res.data;
        this.setState({name});
      })
  }

  render() {
    const {name} = this.state;
    return (
        <View style={styles.container}>
          <Text style={{color: '#fff'}}>Hello Joris Bitch !!!!!</Text>
          <Button variant="success">Success</Button>{' '}
          <Text style={{color: '#fff'}}>C'est moi {name} le boss mtn</Text>
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
