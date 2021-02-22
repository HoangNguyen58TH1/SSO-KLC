import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import firebase from 'firebase'

import LoginScreen from './screen/LoginScreen'
import LoadingScreen from './screen/LoadingScreen'
import DashboardScreen from './screen/DashboardScreen'
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const LoginScreenStack = createStackNavigator({ screen: LoginScreen });
const LoadingScreenStack = createStackNavigator({ screen: LoadingScreen });
const DashboardScreenStack = createStackNavigator({ screen: DashboardScreen });

const AppSwitchNavigator = createSwitchNavigator(
  {
    LoadingScreenStack,
    LoginScreenStack,
    DashboardScreenStack
  },
  {
    initialRouteName: 'LoadingScreenStack',
  }  
)
const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
