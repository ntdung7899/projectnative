import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { HelperText, Icon, TextInput } from 'react-native-paper';
function Signup({ navigation }) {
  const [user, setUserName] = useState({
    username: '',
    password: '',
    numberPhone: '',
    email: '',
  });
  const [numberKey, setNumberKey] = useState({ number: '' });
  const [emailKey, setEmailKey] = useState({ email: '' });

  
  const [userErrorMessage, setUserErrorMessage] = useState(null)
  const [typeErrorEmail, setTypeError] = useState(null)
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null)
  const [isErrorPass, setErrorPass] = useState(null)
  const [isErrorPhone, setErrorPhone] = useState(null)

  const [isSelected, setSelection] = useState(true);


  // check username
  const validateUserName = (text) => {
    return text.length < 1 ? setUserErrorMessage('Please enter a username') : setUserErrorMessage(null)
  }
  //check phone
  const validatePhone = (value) => {

    if (value.length < 1 || value.length >= 11 || isNaN(value)) {
      setPhoneErrorMessage('Contact Number should consist of 10 digits only!')
    }
    else {
      setPhoneErrorMessage(null)
    }
  }
  // check email 
  const validateEmail = (value) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const res = reg.test(value)
    if (res == false || value.length < 1) {
      if (value.length < 1) {
        setTypeError('Please enter your email')
      }
      else {
        setTypeError('Please enter correct email')
      }

    }
    else {
      setTypeError('')
    }
  }
  const validatePass = (text) => {
    return text.length < 1 ? setErrorPass(true) : setErrorPass(false)
  }
  
  const checkSubmit = () => {
    if (user.username.length < 1) {
      setUserErrorMessage('Please enter a username')
    }
    if (user.email.length < 1) {
      setTypeError('Please enter your email')
    }
    if (user.numberPhone.length < 10 || user.numberPhone.length > 10 || isNaN(user.numberPhone)) {
      setPhoneErrorMessage('Contact Number should consist of 10 digits only!')
    }
    if (user.password.length < 1) {
      setErrorPass(true);
      return;
    }
    if (user.password.length >= 1) {
      if (user.username.length < 1 || user.email.length < 1 || user.numberPhone.length < 1 || user.numberPhone.length > 10 || isNaN(user.numberPhone)) return;
      else {
        navigation.navigate('Login', { userName: user })
      }
    }
   
  }
  const checkAndSetUser = (text) => {
    validateUserName(text);
    setUserName({ username: text, password: user.password, numberPhone: user.numberPhone, email: user.email });
    
  }
  const checkAndSetEmail = (text) => {
    validateEmail(text);
    setUserName({ username: user.username, password: user.password, numberPhone: user.numberPhone, email: text });
   
  }
  const checkAndSetPhone = (text) => {
    validatePhone(text);
    setUserName({ username: user.username, password: user.password, numberPhone: text, email: user.email });
    
  }
  const checkAndSetPass = (text) => {
    validatePass(text); 
    setUserName({ username: user.username, password: text, numberPhone: user.numberPhone, email: user.email })
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.signupText}>Create Account</Text>
        <View>
          <TextInput
            style={styles.input}
            value={user.username}
            error={Boolean(userErrorMessage)}
            maxLength={16}
            placeholder='User name'
            mode='outlined'
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="account" />}
            onChangeText={(text) => checkAndSetUser(text)} />
          <HelperText type='error' visible={Boolean(userErrorMessage)}>
            {userErrorMessage}
          </HelperText>
        </View>
        <View>
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder='Email'
            value={user.email}
            error = {Boolean(typeErrorEmail)}
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="email" />}
            onChangeText={(value) => checkAndSetEmail(value)} />
          <HelperText type='error' visible={Boolean(typeErrorEmail)} >
            {typeErrorEmail}
          </HelperText>
        </View>
        <View>
          <TextInput
            error={Boolean(phoneErrorMessage)}
            style={styles.input}
            placeholder='Phone'
            mode='outlined'
            value={user.numberPhone}
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="phone" />}
            onChangeText={(value) => checkAndSetPhone(value)}
          />
          <HelperText type='error' visible={Boolean(phoneErrorMessage)} >
          {phoneErrorMessage}
          </HelperText>
        </View>
        <TextInput
          style={styles.input}
          mode='outlined'
          placeholder='Password'
          value={user.password}
          maxLength={16}
          secureTextEntry={isSelected}
          underlineColorAndroid='transparent'
          onChangeText={(text) => checkAndSetPass(text)}
          left={<TextInput.Icon name="lock" />}
          right={<TextInput.Icon name="eye" onPress={() => setSelection(!isSelected)} />} />
        <HelperText type='error' visible={isErrorPass}>
          Password not null !
        </HelperText>
        <View  >
          <TouchableOpacity onPress={checkSubmit} >
            <View style={styles.btnSignup}>
              <Text style={{ color: 'white', fontSize: 19 }}>Sign up</Text>
            </View>

          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text style={{ color: 'white', marginTop: 10, marginBottom: 30, fontWeight: 'bold' }}>Or signup with social media account </Text>
        <View style={styles.signupWithSocial}>
          <TouchableOpacity style={{ paddingTop: 10 }}>
            <View style={styles.imgSignupSocial}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/1200px-Facebook_circle_pictogram.svg.png' }}
                style={{
                  height: 30,
                  width: 30,
                  paddingTop: 20
                }}
              />
              <Text style={styles.textInsideButtonSocial}>Continue With Facebook</Text>
            </View>

          </TouchableOpacity>
        </View>
        <View style={styles.signupWithSocial}>
          <TouchableOpacity style={{ paddingTop: 10 }}>
            <View style={styles.imgSignupSocial}>
              <Image source={{ uri: 'https://www.vhv.rs/dpng/d/551-5511916_2019-pro-exp-media-inc-circle-twitter-logo.png' }}
                style={{
                  height: 30,
                  width: 30,
                  paddingTop: 20
                }} />
              <Text style={styles.textInsideButtonSocial}>Continue With Google</Text>
            </View>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,

  },
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 260
  },
  signupText: {
    fontSize: 25,
    fontFamily: 'bold',
    color: 'black'
  },

  input: {
    width: 350,
    height: 40,
    backgroundColor: null
  },
  btnSignup: {
    margin: 20,
    backgroundColor: '#FF3D00',
    width: 150,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupWithSocial: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 10,

  },
  imgSignupSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10
  },
  textInsideButtonSocial: {
    color: 'black',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 10
  }
})
export default Signup;
