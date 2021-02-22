import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase'

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if(user) {
          this.props.navigation.navigate('DashboardScreenStack');
        } else {
          this.props.navigation.navigate('LoginScreenStack')
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <View>
        <Text> LoadingScreen </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
