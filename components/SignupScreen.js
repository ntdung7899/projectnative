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
  const [isError, setError] = useState({
    isErrorUser: false,
    isErrorEmail: false,
    isErrorPassword: false,
    isErrorPhone: false,
  })
  const [isSelected, setSelection] = useState(true);
  //check phone
  const validationNumber = (value) => {
    if (value.length <= 10 && /^[0-9\b]+$/.test(value)) {
      setNumberKey({ number: value });
      if (value.length == 10) {
        setErrorPhone(false);
        console.log('10')
      }
    }
    else if (value.length > 10) {
      setErrorPhone(true);

    }
    else {
      setErrorPhone(true);
      console.log(value)
    }
  }
  // check email 
  const validationEmail = (value) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false && value.length == null) {

      setEmailKey({ email: value })
      setErrorEmail(true);
    }
    else {
      setEmailKey({ email: value })
      setErrorEmail(false);

    }
  }
  // check null input
  const hasErrors = () => {
    return user.username.length < 1;
  };
  const checkSubmit = () => {
    if(user.username.length <= 0) {
      setError({isErrorUser: true, isErrorEmail: isError.isErrorEmail, isErrorPhone: isError.isErrorPhone, isErrorPassword: isError.isErrorPassword});
      return;
    }
     
    
     else if (user.numberPhone.length <= 0 || user.numberPhone.length >= 11 || isNaN(user.numberPhone)) {
      setError({isErrorUser: isError.isErrorUser, isErrorEmail: isError.isErrorEmail, isErrorPhone: true, isErrorPassword: isError.isErrorPassword});
      return;
      
    }
    else if (user.email.length <= 0 ) {
      setError({isErrorUser: isError.isErrorUser, isErrorEmail: true, isErrorPhone: isError.isErrorPhone, isErrorPassword: isError.isErrorPassword});
      return;
    }
   else if(user.password.length <= 0 ){
      setError({isErrorUser: isError.isErrorUser, isErrorEmail: isError.isErrorEmail, isErrorPhone: isError.isErrorPhone, isErrorPassword: true});
      return; 
    }
    else {
      navigation.navigate('Login', {userName: user});
      console.log('login success')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.signupText}>Create Account</Text>
        <View>
          <TextInput
            style={styles.input}
            value={user.username}
            error={isError.isErrorUser}
            placeholder='User name'
            mode='outlined'
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="account" />}
            onChangeText={(text) => setUserName({username: text, password: user.password, numberPhone: user.numberPhone , email: user.email})}/>
          <HelperText type='error' visible={isError.isErrorUser}>
            Username is empty !
          </HelperText>
        </View>
        <View>
          <TextInput
            error={isError.isErrorEmail}
            style={styles.input}
            mode='outlined'
            placeholder='Email'
            value={user.email}
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="email" />}
            onChangeText={(value) => setUserName({username: user.username, password: user.password, numberPhone: user.numberPhone , email: value})} />
          <HelperText type='error' visible={isError.isErrorEmail} >
            E-mail Address is required!
          </HelperText>
        </View>
        <View>
          <TextInput
            error={isError.isErrorPhone}
            style={styles.input}
            placeholder='Phone'
            mode='outlined'
            value={user.numberPhone}
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="phone" />}
            onChangeText={(value) => setUserName({username: user.username, password: user.password, numberPhone: value , email: user.email})}
          />
          <HelperText type='error' visible={isError.isErrorPhone} >
            Contact Number should consist of 10 digits only !
          </HelperText>
        </View>


        <TextInput
          style={styles.input}
          mode='outlined'
          placeholder='Password'
          value={user.password}
          secureTextEntry={isSelected}
          underlineColorAndroid='transparent'
          onChangeText={(text) => setUserName({username: user.username, password: text, numberPhone: user.numberPhone , email: user.email})}
          left={<TextInput.Icon name="lock" />} 
          right={<TextInput.Icon name="eye" onPress={() => setSelection(!isSelected)}/>}/>
          <HelperText type='error' visible={isError.isErrorPassword} >
            Password not null !
          </HelperText>
        <View style={styles.btnSignup} >
          <TouchableOpacity onPress={checkSubmit} >
            <Text style={{ color: 'white', fontSize: 19 }}>Sign up</Text>
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
