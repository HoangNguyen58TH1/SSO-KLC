import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase'
import * as Google from 'expo-google-app-auth'

export default class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          // googleUser.getAuthResponse().id_token
          googleUser.idToken,
          googleUser.accessToken
        );
  
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential) //create react-native app with expo
          // .signInAndRetrieveDataWithCredential(credential) // create react-native app (full)
          .then(function(){
            console.log('User singed in');
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
    );
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior: 'web',
        iosClientId: '781708775151-l8dckpkc8squ1fq16v1jh22hlf3ch3jd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        this.onSignIn(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login screen</Text>
        {/* <TouchableOpacity style={styles.viewBtnFb}>
          <Text style={styles.btnFb}>Đăng nhập bằng Facebook</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.viewBtnGg} onPress={() => this.signInWithGoogleAsync() }>
          <Text style={styles.btnGg}>Đăng nhập bằng Google</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0de',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  viewBtnFb:{
    width:"80%",
    backgroundColor:"#0f2c7e",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  },
  btnFb: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  viewBtnGg: {
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  },
  btnGg: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
})