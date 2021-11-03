import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { HelperText, Icon, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Login({ navigation }) {
  const [isSelected, setSelection] = useState();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.login}>
          Login
        </Text>
        <View style={styles.userStyle}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="account" />} />
        </View>
        <View style={styles.userStyle}>
          <TextInput
            style={styles.input}
            placeholder='Password'
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            left={<TextInput.Icon name="lock" />} />
        </View>
        <View style={[{ width: "40%", marginTop: 20, backgroundColor: "red" }]}>
          <Button
            title="Login"
            color="#FF3D00"
          />
        </View>

        <Text style={{ marginTop: 30, color: 'blue' }}>Forgot Password ?</Text>
        <View style={styles.loginWith}>
          <TouchableOpacity style={{paddingRight: 10}}>
            <ImageBackground
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/1200px-Facebook_circle_pictogram.svg.png' }}
              style={{
                height: 50,
                width: 50,
                opacity: 1,
                
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 10}}> 
            <ImageBackground
              source={{ uri: 'https://www.vhv.rs/dpng/d/551-5511916_2019-pro-exp-media-inc-circle-twitter-logo.png' }}
              style={{
                height: 50,
                width: 50,
                opacity: 1,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 10}}>
            <ImageBackground
              source={{ uri: 'https://www.kindpng.com/picc/m/117-1171378_transparent-facebook-circle-icon-png-instagram-icono-facebook.png' }}
              style={{
                height: 50,
                width: 50,
                opacity: 1,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signupText}>
          <Text style={{ marginTop: 40, color: 'gray' }}>Don't have an account ? </Text>
          <TouchableOpacity style={{ marginTop: 40, }}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxContainer: {

    flexDirection: "row",
    marginBottom: 20,
  },
  login: {
    justifyContent: 'center',
    fontSize: 25,
    color: 'black',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 50
  },
  checkbox: {
    alignSelf: 'center',
  },
  input: {
    width: 250,
    margin: 12,
    height: 40,
    backgroundColor: null
  },
  userStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    height: 40,
    marginBottom: 20
  },
  icon: {
    padding: 10,
  },
  button: {
    width: 100,
    marginTop: 10,
    backgroundColor: 'blue',
  },
  signupText: {
    flexDirection: 'row',
  },
  loginWith:{
    marginBottom: 30,
    marginTop: 30,
    flexDirection: 'row'
  },
});
export default Login;
